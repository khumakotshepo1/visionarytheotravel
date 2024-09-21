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

import { CloudUpload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { userImageAction } from "@/actions/settings.actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@/components/icons";

import { Session } from "next-auth";
import { UserImageType } from "@/zod/types/settings.type";
import { imageSchema } from "@/zod/schemas/settings.schema";

export const ChangeImage = ({ session }: { session: Session | null }) => {
  const { refresh } = useRouter();

  const form = useForm<UserImageType>({
    resolver: zodResolver(imageSchema),
  });

  const uploadImage = async (data: UserImageType) => {
    const file = data.image[0] as File;

    const formData = new FormData();
    formData.append("image", file);

    const res = await userImageAction(formData);

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
          {session?.user?.image === null ? "add" : "edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
          <DialogDescription>Add or edit your profile image</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(uploadImage)}
          className="flex items-center space-x-2"
        >
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Image
            </Label>
            <Input
              id="link"
              type="file"
              {...form.register("image")}
              className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <Button
            type="submit"
            role="submit"
            aria-label="Add image"
            disabled={form.formState.isSubmitting}
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Add image</span>
            {form.formState.isSubmitting ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <CloudUpload className="h-4 w-4" />
            )}
          </Button>
        </form>
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
