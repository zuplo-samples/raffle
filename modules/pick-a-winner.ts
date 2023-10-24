import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { getSBClient } from "./sb-client";

export default async function (request: ZuploRequest, context: ZuploContext) {

  const supabase = getSBClient();

  const { data: entries, error } = await supabase
    .from('entries')
    .select('name,email')

  if (error) {
    throw error;
  }

  context.log.info({ entriescount: entries.length });
  const pick = Math.round(Math.random() * entries.length);

  return { winner: entries[pick] }
} 