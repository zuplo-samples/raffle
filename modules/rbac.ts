import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

type MyPolicyOptionsType = {
  role: string;
};

export default async function (
  request: ZuploRequest,
  context: ZuploContext,
  options: MyPolicyOptionsType,
  policyName: string
) {

  if (!request.user.data.roles || !request.user.data.roles.includes(options.role)) {
    return new Response(`🛑 You do not have permissions.
✋ We implemented RBAC using Zuplo.
😜 Nice try though.`, { status: 401 });
  }

  return request;
}
