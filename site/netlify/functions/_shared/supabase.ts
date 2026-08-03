import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export type Commitment = {
  id: string;
  session_id: string;
  name: string;
  email: string;
  stage_crisis: string;
  blocker: string;
  action_text: string;
  accountability_note: string;
  paired_with_id: string | null;
  status: "pending" | "paired";
  check_in_token: string;
  nudge_count: number;
  last_nudge_at: string | null;
  welcome_sent: boolean;
  day7_sent: boolean;
  created_at: string;
};
