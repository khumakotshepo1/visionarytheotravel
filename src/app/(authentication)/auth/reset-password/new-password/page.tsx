import { NewPasswordForm } from "./NewPasswordForm";
import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

const NewPassword = async ({
  searchParams,
}: {
  searchParams: URLSearchParams; // Use URLSearchParams
}) => {
  const token = searchParams.get("token"); // Use .get() method

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
