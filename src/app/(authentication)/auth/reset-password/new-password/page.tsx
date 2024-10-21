
import { NewPasswordForm } from "./NewPasswordForm";
import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

interface NewPasswordProps {
  searchParams: { token?: string }; // Use optional chaining for safety
}

const NewPassword = async ({ searchParams }: NewPasswordProps) => {
  const token = searchParams.token; // Directly access the token

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
