"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import { CustomInput } from "@/components/custom-input";
import { UserLoginType } from "@/zod/types/auth.type";
import { userLoginSchema } from "@/zod/schemas/auth.schema";
import { loginAction } from "@/actions/auth.action";

export const LoginForm = () => {
  const form = useForm<UserLoginType>({
    resolver: zodResolver(userLoginSchema), // Apply the zodResolver
  });

  const { push } = useRouter();

  const processForm = async (data: UserLoginType) => {
    console.log({ data });

    const res = await loginAction(data);

    if (res?.error) {
      console.log(res.error);
      toast.error(res.error);
    }

    if (res?.success) {
      console.log(res.success);
      toast.success(res.success);
      push("/");
    }
  };

  return (
    <Card className="mx-auto max-w-[500px] border-0">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            <div className="grid gap-2">
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Email"
                type="text"
              />
            </div>

            <div className="grid gap-2">
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="flex flex-col items-center justify-between gap-2">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full bg-highlightPath"
              >
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="mt-4 text-sm flex flex-col justify-start items-start py-3 gap-4">
        <div className="text-sm flex justify-center items-center gap-2">
          <p>Don&apos;t have an account?</p>
          <Link
            aria-label="Sign up"
            href="/auth/register"
            className="underline font-bold"
          >
            Register
          </Link>
        </div>
        <div className="text-sm flex justify-center items-center gap-2">
          <p>Forgot your password?</p>
          <Link
            aria-label="Reset password"
            href="/auth/reset-password"
            className="underline font-bold"
          >
            Reset Password
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
