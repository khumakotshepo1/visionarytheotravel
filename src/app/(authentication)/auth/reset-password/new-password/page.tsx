/* eslint-disable */

import React from "react";
import { NewPasswordForm } from "./NewPasswordForm";

import { redirect } from "next/navigation";
import { getVerificationTokenByToken } from "@/server/users.server";

const NewPassword = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
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
