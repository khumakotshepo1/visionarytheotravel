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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fullNameAction } from "@/actions/settings.actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@/components/icons";
import { CheckCircle2 } from "lucide-react";
import { UserFullNameType } from "@/zod/types/settings.type";
import { fullNameSchema } from "@/zod/schemas/settings.schema";

export const ChangeFullName = () => {
  const { refresh } = useRouter();

  const form = useForm<UserFullNameType>({
    resolver: zodResolver(fullNameSchema),
  });

  const saveFullName = async (data: UserFullNameType) => {
    const res = await fullNameAction(data);

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
      <DialogContent className="sm:max-w-md bg-gray-100 dark:bg-black">
        <DialogHeader>
          <DialogTitle>Change Full Name</DialogTitle>
          <DialogDescription>Edit your profile full name</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveFullName)}
            className="space-y-8"
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          type="text"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} type="text" />
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
