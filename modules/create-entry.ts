import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";
import { createClient } from '@supabase/supabase-js'
import { getSBClient } from "./sb-client";

interface Entry {
  name: string,
  email: string
}

export default async function (request: ZuploRequest, context: ZuploContext) {

  const supabase = getSBClient();

  const entry: Entry = await request.json();

  const { data, error } = await supabase
    .from('entries')
    .insert([
      {
        sub: crypto.randomUUID(),
        name: entry.name,
        email: entry.email
      }
    ])
    .select();

  if (error) {
    if (error.code === "23505") {
      return new Response(`✋ You already entered the raffle today,
one entry per person!`, { status: 400 });
    }

    context.log.error(error);
    return new Response(`Error: ${error.message}`, { status: 400 });
  }

  context.log.info(data);
  return new Response(`Congratulations 🎉

You have been entered into the raffle.

You have to be present at 5:30pm when 
we announce the winner to be eligible 
for the prize!`);
}