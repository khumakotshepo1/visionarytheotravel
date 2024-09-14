import { auth } from "@/auth";
import { DesktopNav } from "@/components/_dashboard/_dash-sidebar/DesktopNav";
import { getVerificationTokenByEmail } from "@/server/users.server";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "aboutvibes | Admin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const verificationToken = await getVerificationTokenByEmail(
    session?.user?.email as string
  );
  const token = verificationToken?.token;

  return (
    <>
      {token && (
        <article className="w-full p-3 bg-blue-400 font-bold ">
          <p className="animate-bounce text-center">
            Check your email inbox for verification link
          </p>
        </article>
      )}
      <div className="h-[80vh] flex">
        <DesktopNav session={session} />
        <section className="flex-1 overflow-auto p-3">{children}</section>
      </div>
    </>
  );
}
