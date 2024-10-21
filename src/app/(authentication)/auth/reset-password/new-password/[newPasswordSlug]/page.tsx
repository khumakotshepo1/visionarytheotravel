import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";
import { NewPasswordForm } from "../NewPasswordForm";

const NewPasswordSlug = async ({
  params,
}: {
  params: { newPasswordSlug: string };
}) => {
  const token = params.newPasswordSlug; // Directly access the token

  if (!token) {
    redirect("/auth/login");
  }

  const userToken = await getVerificationTokenByToken(token);

  if (!userToken) {
    redirect("/auth/login");
  }

  return <NewPasswordForm token={token} />;
};

export default NewPasswordSlug;
