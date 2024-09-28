import { signOutAction } from "@/actions/auth.action";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export function SignButton() {
  return (
    <>
      <Link href="/auth/login">
        <button className="hidden md:block px-3 py-1 rounded-full font-anton font-bold bg-orangeElement text-white">
          Login
        </button>
        <LogInIcon className="h-8 w-8 md:hidden" />
      </Link>
    </>
  );
}

export const SignOutButton = () => {
  return (
    <form className="w-fit" action={signOutAction}>
      <button aria-label="Logout" role="button" type="submit">
        Logout
      </button>
    </form>
  );
};
