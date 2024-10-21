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

import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";
import { PassStrength } from "@/components/pass-strength";
import { NewPasswordType } from "@/zod/types/auth.type";
import { newPasswordSchema } from "@/zod/schemas/auth.schema";
import { newPasswordAction } from "@/actions/auth.action";
import { CustomInput } from "@/components/custom-input";

export const NewPasswordForm = ({ token }: { token: string }) => {
  const { push, refresh } = useRouter();

  const form = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
  });

  const [passStrength, setPassStrength] = useState(0);

  useEffect(() => {
    setPassStrength(passwordStrength(form.watch().password).id);
  }, [form]);

  const processForm = async (data: NewPasswordType) => {
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
                <CustomInput
                  control={form.control}
                  label="New Password"
                  name="password"
                  placeholder="New Password"
                  type="password"
                />

                <PassStrength passStrength={passStrength} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <CustomInput
                  control={form.control}
                  label="Confirm Password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  type="password"
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
