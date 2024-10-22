import { auth } from "@/auth";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ErrorPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const session = await auth();
  const error = searchParams.error;

  if (error === "AccessDenied") {
    if (session) {
      // User is logged in but doesn't have the right permissions
      redirect("/dashboard");
    } else {
      // User is not logged in
      redirect("/auth/login");
    }
  } else if (session) {
    // For other errors, if user is logged in, redirect to dashboard
    redirect("/dashboard");
  } else {
    // For other errors, if user is not logged in, redirect to login
    redirect("/auth/login");
  }

  return null;
}
