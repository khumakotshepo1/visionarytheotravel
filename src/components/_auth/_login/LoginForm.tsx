"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const { push, refresh } = useRouter();

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
      setTimeout(() => {
        refresh();
      }, 2000);

      push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className="space-y-8 max-w-[500px] mx-auto p-8"
      >
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
            className="w-full bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
          >
            {form.formState.isSubmitting ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <div className="mt-4 text-sm flex flex-col justify-start items-start py-3 gap-4">
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
        </div>
      </form>
    </Form>
  );
};
