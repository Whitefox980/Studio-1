import { supabase } from "./supabase";

export async function trackEvent(params: { query: string, agent: string }) {
  await supabase.rpc('log_analytics', params);
}
