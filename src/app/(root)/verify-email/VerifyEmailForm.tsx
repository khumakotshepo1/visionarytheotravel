"use client";

import { newVerificationTokenAction } from "@/actions/settings.actions";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const params = useSearchParams();
  const token = params.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Invalid token");
      return;
    }

    try {
      const res = await newVerificationTokenAction(token);

      if (res?.error) {
        setError(res.error);
      }

      if (res?.success) {
        setSuccess(res.success);
      }
    } catch (error) {
      setError(error as string);
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-full md:w-1/2 mx-auto flex flex-col items-center gap-3 text-center">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
      </CardHeader>
      <CardContent>
        {!success && !error && (
          <p className="text-gray-500 animate-ping">Loading...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </CardContent>
      <CardFooter>
        <Link
          href="/"
          className="flex items-center gap-2 bg-green-700 p-3 rounded-lg"
        >
          <Home className="w-6 h-6" /> Go Home
        </Link>
      </CardFooter>
    </Card>
  );
};
