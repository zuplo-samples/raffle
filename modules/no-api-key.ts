import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (
  request: ZuploRequest,
  context: ZuploContext,
  options: never,
  policyName: string
) {
  // your policy code goes here, and can use the options to perform any
  // configuration
  // See the docs: https://www.zuplo.com/docs/policies/custom-code-inbound
  if (request.headers.get("authorization") === null) {
    return new Response(`You didn't provide an API Key - make sure you sign-in to the dev-portal.`)
  }

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
