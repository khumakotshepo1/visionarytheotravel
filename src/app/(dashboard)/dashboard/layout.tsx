import NextProgress from "@/components/next-progress";
import { DesktopNav } from "@/components/_dashboard/_dash-sidebar/DesktopNav";
import { auth } from "@/auth";
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
        <div className="h-[80vh] flex fixed w-full lg:relative container mx-auto overflow-auto">
          <DesktopNav session={session} />
          <section className="pl-3 lg:flex-1 lg:w-auto lg:m-0 overflow-y-scroll no-scrollbar">
            {children}
          </section>
        </div>
      </NextProgress>
    </>
  );
}
