import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";
import { NewPasswordForm } from "../NewPasswordForm";

const NewPasswordSlug = async ({ params }: { params: { newPasswordSlug: string } }) => {
  const { newPasswordSlug: token } = params;

  if (!token) {
    redirect("/auth/login");
    return;
  }

  const userToken = await getVerificationTokenByToken(token);

  if (!userToken) {
    redirect("/auth/login");
    return;
  }

  return <NewPasswordForm token={token} />;
};

export default NewPasswordSlug;
