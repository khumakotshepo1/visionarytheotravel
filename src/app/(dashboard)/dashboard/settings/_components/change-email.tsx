"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { CheckCircle2 } from "lucide-react";
import { UserEmailType } from "@/zod/types/settings.type";
import { emailSchema } from "@/zod/schemas/settings.schema";
import { emailAction } from "@/actions/settings.actions";

export const ChangeEmail = () => {
  const { refresh } = useRouter();

  const form = useForm<UserEmailType>({
    resolver: zodResolver(emailSchema),
  });

  const saveEmail = async (data: UserEmailType) => {
    const res = await emailAction(data);

    if (res?.error) {
      toast.error(res.error);
    }

    if (res?.success) {
      toast.success(res.success);

      form.reset();
      refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-background dark:bg-background">
          edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Email Address</DialogTitle>
          <DialogDescription>
            Change your profile email address
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveEmail)} className="space-y-8">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@example.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              disabled={
                form.formState.isSubmitting || form.formState.isSubmitSuccessful
              }
              type="submit"
              role="submit"
              aria-label="Change Full Name"
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : form.formState.isSubmitSuccessful ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              role="button"
              aria-label="Close"
              variant="secondary"
              onClick={() => form.reset()}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
