import type { Handler } from "@netlify/functions";
import { getSupabase, type Commitment } from "./_shared/supabase";

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  const id = event.queryStringParameters?.id;
  if (!id) {
    return json(400, { error: "Commitment id is required" });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("workshop_commitments")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return json(404, { error: "Commitment not found" });
    }

    const commitment = data as Commitment;

    if (commitment.status === "paired" && commitment.paired_with_id) {
      const { data: partnerRow } = await supabase
        .from("workshop_commitments")
        .select("name, action_text, blocker")
        .eq("id", commitment.paired_with_id)
        .single();

      return json(200, {
        status: "paired",
        commitment: {
          id: commitment.id,
          name: commitment.name,
          actionText: commitment.action_text,
        },
        partner: partnerRow
          ? {
              name: partnerRow.name,
              actionText: partnerRow.action_text,
              blocker: partnerRow.blocker,
            }
          : null,
      });
    }

    return json(200, {
      status: "waiting",
      commitment: {
        id: commitment.id,
        name: commitment.name,
        actionText: commitment.action_text,
      },
    });
  } catch (err) {
    console.error(err);
    return json(500, { error: "Something went wrong" });
  }
};
