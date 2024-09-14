"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { newPasswordAction } from "@/actions/auth.actions";
import { toast } from "sonner";
import { NewPasswordInput } from "./NewPasswordInput";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";
import { PassStrength } from "@/components/pass-strength";
import { newPasswordType } from "@/types/zodTypes";
import { newPasswordSchema } from "@/lib/zod-schemas/auth.schema";

export const NewPasswordForm = ({ token }: { token: string }) => {
  const { push, refresh } = useRouter();

  const form = useForm<newPasswordType>({
    resolver: zodResolver(newPasswordSchema),
  });

  const [passStrength, setPassStrength] = useState<number>(0);

  useEffect(() => {
    setPassStrength(passwordStrength(form.watch().password).id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch().password]);

  const processForm = async (data: newPasswordType) => {
    const res = await newPasswordAction(token, data);

    if (res?.error) {
      toast.error(res.error);
    }

    if (res?.success) {
      toast.success(res.success);
      form.reset();
      refresh();
      setTimeout(() => {
        push("/admin/thabo-mofutsanyane");
      }, 2000);
    }
  };

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to organization portal</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <NewPasswordInput
                  control={form.control}
                  label="New Password"
                  name="password"
                  placeholder="New Password"
                />

                <PassStrength strength={passStrength} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <NewPasswordInput
                  control={form.control}
                  label="Confirm Password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <Button
              type="submit"
              role="submit"
              aria-label="Login"
              className="w-full"
            >
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
