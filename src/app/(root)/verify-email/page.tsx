import { Suspense } from "react";
import { VerifyEmailForm } from "./VerifyEmailForm";

export default function VerifyEmail() {
  return (
    <>
      <Suspense><VerifyEmailForm /></Suspense>
    </>
  );
}
