import type { Handler } from "@netlify/functions";
import { getSupabase } from "./_shared/supabase";

type CheckInBody = {
  token: string;
  completed: boolean;
  reflection: string;
  partnerUpdate?: string;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      },
      body: "",
    };
  }

  const supabase = getSupabase();

  if (event.httpMethod === "GET") {
    const token = event.queryStringParameters?.token;
    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ error: "Token required" }) };
    }

    const { data, error } = await supabase
      .from("workshop_commitments")
      .select("id, name, action_text, paired_with_id, status, created_at")
      .eq("check_in_token", token)
      .single();

    if (error || !data) {
      return { statusCode: 404, body: JSON.stringify({ error: "Commitment not found" }) };
    }

    let partner = null;
    if (data.paired_with_id) {
      const { data: p } = await supabase
        .from("workshop_commitments")
        .select("name, action_text")
        .eq("id", data.paired_with_id)
        .single();
      partner = p;
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commitment: data, partner }),
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body ?? "{}") as CheckInBody;
    if (!body.token) {
      return { statusCode: 400, body: JSON.stringify({ error: "Token required" }) };
    }

    const { data, error } = await supabase
      .from("workshop_commitments")
      .select("id, email, name, action_text, paired_with_id")
      .eq("check_in_token", body.token)
      .single();

    if (error || !data) {
      return { statusCode: 404, body: JSON.stringify({ error: "Commitment not found" }) };
    }

    // Store check-in in a simple log table — for MVP, email the facilitator
    // Future: add workshop_check_ins table
    console.log("Check-in received:", {
      commitmentId: data.id,
      completed: body.completed,
      reflection: body.reflection,
      partnerUpdate: body.partnerUpdate,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "Something went wrong" }) };
  }
};
