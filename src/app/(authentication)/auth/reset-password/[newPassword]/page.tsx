
import { NewPasswordForm } from "./NewPasswordForm";
import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

const NewPassword = async ({ params }: { params: { newPassword: string } }) => {
  const token = params.newPassword; // Directly access the token

  if (!token) {
    redirect("/auth/login");
  }

  const userToken = await getVerificationTokenByToken(token);

  if (!userToken) {
    redirect("/auth/login");
  }

  return <NewPasswordForm token={token} />;
};

export default NewPassword;
