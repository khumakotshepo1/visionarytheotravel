import React from "react";
import { NewPasswordForm } from "./NewPasswordForm";

import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

const NewPassword = async ({
  params,
}: {
  params: { token: string };
}) => {
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
