import { environment } from "@zuplo/runtime";
import { createClient } from "@supabase/supabase-js";

export function getSBClient() {
  const supabaseUrl = 'https://albncxypgegedcizbagd.supabase.co';
  const supabaseKey = environment.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}