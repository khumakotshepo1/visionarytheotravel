import React from "react";
import { NewPasswordForm } from "./NewPasswordForm";

import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

interface TokenProps {
  params: { token: string };
}

const NewPassword = async ({
  params
}: TokenProps) => {
  const token = params.token;

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
