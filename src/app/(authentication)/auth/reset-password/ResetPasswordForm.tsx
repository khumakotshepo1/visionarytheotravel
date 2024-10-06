"use client";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { ResetPasswordType } from "@/zod/types/auth.type";
import { resetPasswordSchema } from "@/zod/schemas/auth.schema";
import { resetPasswordAction } from "@/actions/auth.action";
import { CustomInput } from "@/components/custom-input";

export const ResetPasswordForm = () => {
  const { push } = useRouter();

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const processForm = async (data: ResetPasswordType) => {
    const res = await resetPasswordAction(data);

    console.log({ res: res });

    if (res?.success) {
      toast.success(res.success);
      form.reset();
      push("/auth/login");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className="space-y-8 max-w-[500px] mx-auto p-8"
      >
        <div className="flex flex-col space-y-1.5">
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
            type="text"
          />
        </div>

        <Button
          type="submit"
          role="submit"
          aria-label="Reset Password"
          disabled={form.formState.isSubmitting}
          className="w-full bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
        >
          {form.formState.isSubmitting ? "Resetting..." : "Reset"}
        </Button>
        <div className="mt-4 text-sm flex flex-col justify-start items-start p-3 gap-4">
          <div className="text-sm flex justify-center items-center gap-2">
            <p>Remember your password?</p>
            <Link
              aria-label="Login"
              href="/auth/login"
              className="underline font-bold"
            >
              Login
            </Link>
          </div>
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
        </div>
      </form>
    </Form>
  );
};
