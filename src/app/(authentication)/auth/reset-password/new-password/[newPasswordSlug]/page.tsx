import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";
import { NewPasswordForm } from "../NewPasswordForm";

interface NewPasswordSlugProps {
  params: { newPasswordSlug: string };
}

const NewPasswordSlug = async ({ params }: NewPasswordSlugProps) => {
  const token = params.newPasswordSlug;

  if (!token) {
    redirect("/auth/login");
    return; // Early return after redirect
  }

  const userToken = await getVerificationTokenByToken(token);

  if (!userToken) {
    redirect("/auth/login");
    return; // Early return after redirect
  }

  return <NewPasswordForm token={token} />;
};

export default NewPasswordSlug;
