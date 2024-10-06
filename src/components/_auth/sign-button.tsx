import { signOutAction } from "@/actions/auth.action";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export function SignButton() {
  return (
    <>
      <Link href="/auth/login">
        <button className="hidden md:block px-4 py-1 rounded-xl font-anton font-bold bg-orangeElement text-sm text-white"
          type="button"
          aria-label="Login">
          Login
        </button>
        <LogInIcon className="h-8 w-8 md:hidden" aria-label="Login" />
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
