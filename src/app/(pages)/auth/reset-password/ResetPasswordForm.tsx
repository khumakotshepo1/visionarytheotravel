"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Input } from "@/components/ui/input";

import { resetPasswordAction } from "@/actions/auth.actions";
import { resetPasswordType } from "@/types/zodTypes";
import { resetPasswordSchema } from "@/lib/zod-schemas/auth.schema";

export const ResetPasswordForm = () => {
  const { push } = useRouter();

  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const processForm = async (data: resetPasswordType) => {
    const res = await resetPasswordAction(data);

    console.log({ res: res });

    if (res?.success) {
      toast.success(res.success);
      form.reset();
      push("/auth/login");
    }
  };

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Email will be sent to your email to reset password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@mail.com"
                        {...field}
                        type="text"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              role="submit"
              aria-label="Reset Password"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Resetting..." : "Reset"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="mt-4 text-sm flex flex-col justify-start items-start p-3 gap-4">
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
      </CardFooter>
    </Card>
  );
};
