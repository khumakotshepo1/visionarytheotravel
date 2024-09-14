import { signOutAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export function SignButton() {
  return (
    <>
      <Link href="/auth/login">
        <Button className="hidden md:block rounded-full font-bold font-logo bg-highlightPath hover:bg-menuBg text-white transition-all ease-in-out duration-300">
          Login
        </Button>
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
