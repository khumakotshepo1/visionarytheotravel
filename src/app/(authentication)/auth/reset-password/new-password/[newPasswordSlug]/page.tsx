import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";
import { NewPasswordForm } from "../NewPasswordForm";

type Params = Promise<{ newPasswordSlug: string }>;

export default async function NewPasswordSlug(props: { params: Params }) {
  const params = await props.params;
  const token = params.newPasswordSlug;

  if (!token) {
    redirect("/auth/login");
  }

  const userToken = await getVerificationTokenByToken(token);

  if (!userToken) {
    redirect("/auth/login");
  }

  return <NewPasswordForm token={token} />;
}
