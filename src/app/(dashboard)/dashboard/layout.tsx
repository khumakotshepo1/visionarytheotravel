import { auth } from "@/auth";
import { DesktopNav } from "@/components/_dashboard/_dash-sidebar/DesktopNav";
import NextProgress from "@/components/next-progress";
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
      <NextProgress>
        <div className="h-[80vh] flex fixed w-full lg:relative font-anton container mx-auto">
          <DesktopNav session={session} />
          <section className="overflow-auto p-3 w-[90%] ml-[10%] lg:flex-1 lg:w-auto lg:m-0">
            {children}
          </section>
        </div>
      </NextProgress>
    </>
  );
}
