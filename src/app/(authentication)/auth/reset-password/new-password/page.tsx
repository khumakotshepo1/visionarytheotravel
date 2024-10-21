import { NewPasswordForm } from "./NewPasswordForm";

import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

type Props = {
  searchParams: { token: string };
};

const NewPassword = async ({
  searchParams,
}: Props) => {
  const { token } = searchParams;

  const userToken = await getVerificationTokenByToken(token);

  if (!userToken) {
    redirect("/auth/login");
  }

  return (
    <>
      <NewPasswordForm token={token} />
    </>
  );
};

export default NewPassword;
