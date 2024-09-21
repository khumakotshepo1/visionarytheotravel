"use client";

import { emailVerificationAction } from "@/actions/settings.actions";
import { Icons } from "@/components/icons";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const VerifyEmailBadge = ({
  token,
  email,
}: {
  token?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  email?: any;
}) => {
  const form = useForm();

  const { refresh } = useRouter();

  const verify = async () => {
    const res = await emailVerificationAction(email);

    console.log({ res: res });

    if (res?.error) {
      toast.error(res.error);
    }

    if (res?.success) {
      toast.success(res.success);
      refresh();
    }
  };

  return (
    <form onSubmit={form.handleSubmit(verify)}>
      <button>
        <Badge
          variant="outline"
          className={`${
            token
              ? "border-blue-400 font-bold"
              : "border-highlightPath font-bold"
          }`}
        >
          {token ? (
            <span className="flex gap-2">
              Pending
              <Icons.spinner className="w-4 h-4 animate-spin" />
            </span>
          ) : form.formState.isSubmitting ? (
            <span className="flex gap-2">
              Verifying
              <Icons.spinner className="w-4 h-4 animate-spin" />
            </span>
          ) : (
            "Verify Email"
          )}
        </Badge>
      </button>
    </form>
  );
};
