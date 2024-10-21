
import { NewPasswordForm } from "./NewPasswordForm";
import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

interface NewPasswordProps {
  params: { newPassword: string }; // Use optional chaining for safety
}

const NewPassword = async ({ params }: NewPasswordProps) => {
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
