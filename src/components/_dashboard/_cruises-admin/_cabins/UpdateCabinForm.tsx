"use client";

import { updateCabinAction } from "@/actions/cruise.actions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cabinSchema } from "@/zod/schemas/cruise.schema";
import { CabinType } from "@/zod/types/cruises.type";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mscCabinNames, mscShipsApi } from "../_ships/msc-ships-api";
import { useRouter } from "next/navigation";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function UpdateCabinForm({ cabin }: { cabin: CabinPropsType }) {
  const [cabinImagePreview, setCabinImagePreview] = useState<string | null>(
    null
  );

  const { refresh } = useRouter();

  const form = useForm<CabinType>({
    resolver: zodResolver(cabinSchema),
    defaultValues: {
      cabin_name: cabin.cabin_name,
      cabin_image: cabin.cabin_image,
      ship_id: cabin.ship_name,
    },
  });

  const cabinId = cabin.cabin_id;

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const handleCabinUpdate = async (data: CabinType) => {
    const cabin_image = data.cabin_image[0] as File;
    const cabin_name = data.cabin_name;
    const ship_id = data.ship_id;

    const formData = new FormData();
    formData.append("cabin_image", cabin_image);
    formData.append("cabin_name", cabin_name);
    formData.append("ship_id", ship_id);

    const res = await updateCabinAction(formData, cabinId);

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);

      form.reset();
      refresh();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setCabinImagePreview(fileURL);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Edit Cabin</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Cabin</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCabinUpdate)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="cabin_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cabin Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select cabin type" />
                          </SelectTrigger>
                          <SelectContent>
                            {mscCabinNames.map((item) => (
                              <SelectItem key={item.name} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="ship_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ship</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select ship" />
                          </SelectTrigger>
                          <SelectContent>
                            {mscShipsApi.map((item) => (
                              <SelectItem key={item.name} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cabin_image">
                  <span className="flex items-center gap-2">
                    <CloudUploadIcon className="h-6 w-6" />
                    Upload Cabin Image
                  </span>
                </Label>
                <Input
                  id="cabin_image"
                  type="file"
                  {...form.register("cabin_image", { validate: validateFile })}
                  className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                  onChange={handleFileChange}
                />
                {cabinImagePreview && (
                  <Image
                    src={cabinImagePreview}
                    width={200}
                    height={200}
                    alt="Cabin Preview"
                  />
                )}
                <FormMessage />
              </div>
            </div>
            <DialogClose asChild>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
              >
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
