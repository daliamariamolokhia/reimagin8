import type { Handler } from "@netlify/functions";
import { getSupabase, type Commitment } from "./_shared/supabase";
import {
  sendPairedNotification,
  sendWaitingEmail,
} from "./_shared/email";

type SubmitBody = {
  sessionId: string;
  name: string;
  email: string;
  stageCrisis: string;
  blocker: string;
  actionText: string;
  accountabilityNote: string;
};

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function validate(body: SubmitBody): string | null {
  if (!body.sessionId?.trim()) return "Session ID is required";
  if (!body.name?.trim()) return "Name is required";
  if (!body.email?.trim() || !body.email.includes("@")) return "Valid email is required";
  if (!body.stageCrisis?.trim()) return "Stage / crisis is required";
  if (!body.blocker?.trim()) return "Blocker is required";
  if (!body.actionText?.trim()) return "Your 7-day action is required";
  if (!body.accountabilityNote?.trim()) return "How someone will know is required";
  return null;
}

async function pairWithOldestPending(
  supabase: ReturnType<typeof getSupabase>,
  sessionId: string,
  newId: string,
): Promise<Commitment | null> {
  const { data: candidates, error } = await supabase
    .from("workshop_commitments")
    .select("*")
    .eq("session_id", sessionId)
    .eq("status", "pending")
    .is("paired_with_id", null)
    .neq("id", newId)
    .order("created_at", { ascending: true })
    .limit(1);

  if (error) throw error;
  const partner = candidates?.[0] as Commitment | undefined;
  if (!partner) return null;

  const { error: updatePartner } = await supabase
    .from("workshop_commitments")
    .update({ paired_with_id: newId, status: "paired" })
    .eq("id", partner.id)
    .eq("status", "pending");

  if (updatePartner) throw updatePartner;

  const { error: updateNew } = await supabase
    .from("workshop_commitments")
    .update({ paired_with_id: partner.id, status: "paired" })
    .eq("id", newId)
    .eq("status", "pending");

  if (updateNew) throw updateNew;

  return partner;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const body = JSON.parse(event.body ?? "{}") as SubmitBody;
    const validationError = validate(body);
    if (validationError) return json(400, { error: validationError });

    const supabase = getSupabase();

    const { data: inserted, error: insertError } = await supabase
      .from("workshop_commitments")
      .insert({
        session_id: body.sessionId.trim(),
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        stage_crisis: body.stageCrisis.trim(),
        blocker: body.blocker.trim(),
        action_text: body.actionText.trim(),
        accountability_note: body.accountabilityNote.trim(),
        status: "pending",
      })
      .select("*")
      .single();

    if (insertError || !inserted) {
      console.error(insertError);
      return json(500, { error: "Could not save commitment" });
    }

    const commitment = inserted as Commitment;
    const partner = await pairWithOldestPending(supabase, commitment.session_id, commitment.id);

    if (partner) {
      const { data: refreshed } = await supabase
        .from("workshop_commitments")
        .select("*")
        .eq("id", commitment.id)
        .single();

      const me = (refreshed ?? commitment) as Commitment;

      try {
        await sendPairedNotification(me, partner);
        await sendPairedNotification(partner, me);
        await supabase
          .from("workshop_commitments")
          .update({ welcome_sent: true })
          .in("id", [me.id, partner.id]);
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }

      return json(200, {
        status: "paired",
        commitment: {
          id: me.id,
          name: me.name,
          actionText: me.action_text,
          checkInToken: me.check_in_token,
        },
        partner: {
          name: partner.name,
          actionText: partner.action_text,
          blocker: partner.blocker,
        },
      });
    }

    try {
      await sendWaitingEmail(commitment);
    } catch (emailErr) {
      console.error("Waiting email failed:", emailErr);
    }

    return json(200, {
      status: "waiting",
      commitment: {
        id: commitment.id,
        name: commitment.name,
        actionText: commitment.action_text,
        checkInToken: commitment.check_in_token,
      },
    });
  } catch (err) {
    console.error(err);
    return json(500, { error: "Something went wrong" });
  }
};
