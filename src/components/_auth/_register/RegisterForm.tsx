"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@/components/icons";
import { CustomInput } from "@/components/custom-input";
import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";
import { PassStrength } from "@/components/pass-strength";
import { UserRegisterType } from "@/zod/types/auth.type";
import { userRegisterSchema } from "@/zod/schemas/auth.schema";
import { registerAction } from "@/actions/auth.action";

export function RegisterForm() {
  const form = useForm<UserRegisterType>({
    resolver: zodResolver(userRegisterSchema), // Apply the zodResolver
  });

  const { push } = useRouter();

  const [passStrength, setPassStrength] = useState<number>(0);

  const passwordValue = form.watch().password;

  useEffect(() => {
    setPassStrength(passwordStrength(passwordValue).id);
  }, [passwordValue]);

  const processForm = async (data: UserRegisterType) => {
    console.log({ data });

    const res = await registerAction(data);

    if (res?.error) {
      console.log(res.error);
      toast.error(res.error);
    }

    if (res?.success) {
      console.log(res.success);
      toast.success(res.success);
      push("/auth/login");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className="space-y-8 max-w-[500px] mx-auto p-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <CustomInput
              control={form.control}
              name="first_name"
              label="First Name"
              placeholder="John"
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <CustomInput
              control={form.control}
              name="last_name"
              label="Last Name"
              placeholder="Doe"
              type="text"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@example.com"
            type="text"
          />
        </div>
        <div className="grid gap-2">
          <CustomInput
            control={form.control}
            name="phone"
            label="Cellphone Number"
            placeholder="070 123 4567"
            type="text"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <CustomInput
              control={form.control}
              label="Password"
              name="password"
              placeholder="Password"
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
          aria-label="Register user"
          role="button"
          type="submit"
          className="w-full bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
        >
          {form.formState.isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
        <div className="mt-4 text-sm flex justify-start items-center gap-2 py-3">
          <p>Already have an account?</p>
          <Link
            aria-label="Sign up"
            href="/auth/login"
            className="underline font-bold"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
