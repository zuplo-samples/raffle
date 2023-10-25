import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (
  request: ZuploRequest,
  context: ZuploContext,
  options: never,
  policyName: string
) {
  const badBodyResponse = new Response(`You didn't send a valid body, please send a JSON payload with valid 'name' and 'email' properties`)

  const clone = request.clone();
  try {
    const data = await clone.json();
    if (!data.name || !data.email) {
      return badBodyResponse;
    }
  }
  catch (err) {
    return badBodyResponse;
  }


  return request;
}
