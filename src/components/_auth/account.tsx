import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { auth, signOut } from "@/auth";

export const Account = async () => {
  const session = await auth();

  const firstName = session?.user?.first_name as string;
  const lastName = session?.user?.last_name as string;

  const name = `${firstName} ${lastName}`;

  const avatarName = name?.match(/\b\w/g) || [];

  const role = session?.user?.role;

  const urlRole = role === "MANAGER" ? "admin" : role?.toLowerCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="font-anton bg-darkElement dark:bg-lightElement text-crimsonElement font-semibold">
            {avatarName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-gray-400/10 dark:bg-gray-600/10 backdrop-blur-lg text-darkElement dark:text-lightElement"
      >
        <DropdownMenuLabel>
          <span className="capitalize">{name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/dashboard/${urlRole}`} className="w-full">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="w-full"
          >
            <button
              type="submit"
              role="submit"
              aria-label="Logout"
              className="w-full text-start"
            >
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
