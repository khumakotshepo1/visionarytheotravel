"use client";

import { addCabinAction } from "@/actions/cruise.actions";
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
import Image from "next/image";
import { CloudUploadIcon } from "lucide-react";
import { useState } from "react";

export function CabinForm() {
  const { refresh } = useRouter();

  const [cabinImagePreview, setCabinImagePreview] = useState<string | null>(
    null
  );

  const form = useForm<CabinType>({
    resolver: zodResolver(cabinSchema),
  });

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const processForm = async (data: CabinType) => {
    const cabin_image = data.cabin_image[0] as File;
    const cabin_name = data.cabin_name;
    const ship_id = data.ship_id;

    const formData = new FormData();
    formData.append("cabin_image", cabin_image);
    formData.append("cabin_name", cabin_name);
    formData.append("ship_id", ship_id);

    const res = await addCabinAction(formData);
    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);
      form.reset();
      refresh();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setCabinImagePreview(fileURL);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
        >
          Add Cabin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Cabin</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
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
                  <span className="flex gap-2 items-center justify-center py-3 border-2 border-dashed border-foreground">
                    <CloudUploadIcon className="h-4 w-4" />
                    Upload Cabin Image
                  </span>
                </Label>
                <Input
                  id="cabin_image"
                  type="file"
                  {...form.register("cabin_image", { validate: validateFile })}
                  className="sr-only block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                  onChange={handleImageChange}
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
                className="w-full bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
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
