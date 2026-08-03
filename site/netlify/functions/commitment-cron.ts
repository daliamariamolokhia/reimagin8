import type { Handler } from "@netlify/functions";
import { getSupabase, type Commitment } from "./_shared/supabase";
import { sendDay7Email, sendNudgeEmail } from "./_shared/email";

function daysSince(iso: string) {
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
}

async function loadPartner(
  supabase: ReturnType<typeof getSupabase>,
  commitment: Commitment,
): Promise<Commitment | null> {
  if (!commitment.paired_with_id) return null;
  const { data } = await supabase
    .from("workshop_commitments")
    .select("*")
    .eq("id", commitment.paired_with_id)
    .single();
  return (data as Commitment) ?? null;
}

export const handler: Handler = async (event) => {
  const secret = event.headers["x-cron-secret"] ?? event.queryStringParameters?.secret;
  if (secret !== process.env.CRON_SECRET) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const supabase = getSupabase();
  const { data: paired, error } = await supabase
    .from("workshop_commitments")
    .select("*")
    .eq("status", "paired")
    .not("paired_with_id", "is", null);

  if (error) {
    console.error(error);
    return { statusCode: 500, body: "Query failed" };
  }

  const commitments = (paired ?? []) as Commitment[];
  const processedPairs = new Set<string>();
  let nudgesSent = 0;
  let day7Sent = 0;

  for (const commitment of commitments) {
    const pairKey = [commitment.id, commitment.paired_with_id].sort().join(":");
    if (processedPairs.has(pairKey)) continue;
    processedPairs.add(pairKey);

    const partner = await loadPartner(supabase, commitment);
    if (!partner) continue;

    const ageDays = daysSince(commitment.created_at);

    // Day 7 check-in (once per pair)
    if (ageDays >= 7 && !commitment.day7_sent) {
      const result = await sendDay7Email(commitment, partner);
      if (result.ok) {
        await supabase
          .from("workshop_commitments")
          .update({ day7_sent: true })
          .in("id", [commitment.id, partner.id]);
        day7Sent++;
      } else {
        console.error("Day 7 email failed:", result.error);
      }
      continue;
    }

    // Nudges at ~2.5 and ~5 days (max 2 nudges before day 7)
    if (ageDays < 7 && commitment.nudge_count < 2) {
      const sinceLast =
        commitment.last_nudge_at != null
          ? daysSince(commitment.last_nudge_at)
          : ageDays;
      const threshold = commitment.nudge_count === 0 ? 2 : 2.5;

      if (sinceLast >= threshold) {
        const r1 = await sendNudgeEmail(commitment, partner);
        const r2 = await sendNudgeEmail(partner, commitment);
        if (r1.ok && r2.ok) {
          await supabase
            .from("workshop_commitments")
            .update({
              nudge_count: commitment.nudge_count + 1,
              last_nudge_at: new Date().toISOString(),
            })
            .in("id", [commitment.id, partner.id]);
          nudgesSent++;
        } else {
          console.error("Nudge email failed:", r1.ok ? r2.error : r1.error);
        }
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ nudgesSent, day7Sent, pairsChecked: processedPairs.size }),
  };
};
