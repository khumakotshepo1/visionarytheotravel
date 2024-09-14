import { Account } from "../_auth/account";
import { SignButton } from "../_auth/sign-button";
import DesktopNav from "./DesktopNav";

import { auth } from "@/auth";

export async function MainNavbar() {
  const session = await auth();
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <DesktopNav />
      {session ? <Account /> : <SignButton />}
    </div>
  );
}
