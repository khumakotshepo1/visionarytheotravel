"use client";

import { updateCabinAction } from "@/actions/cruise.actions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { cabinSchema } from "@/zod/schemas/ship.schema";
import { CabinType } from "@/zod/types/ship.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mscCabinNames, mscShipsApi } from "../_ships/msc-ships-api";

type CabinPropsType = {
  name: string;
  ship: string;
  image: string;
  cabin_id: string;
};

export function UpdateCabinForm({ cabin }: { cabin: CabinPropsType }) {
  const form = useForm<CabinType>({
    resolver: zodResolver(cabinSchema),
    defaultValues: {
      name: cabin.name,
      ship_id: cabin.ship,
      image: cabin.image,
    },
  });

  const cabinId = cabin.cabin_id;

  const { refresh } = useRouter();

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const handleCabinUpdate = async (data: CabinType) => {
    console.log({ data });

    const image = data.image[0] as File;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("ship_id", data.ship_id);

    const res = await updateCabinAction(formData, cabinId);

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);
      setTimeout(refresh, 2000);
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
                  name="name"
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

              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Image
                </Label>
                <Input
                  id="link"
                  type="file"
                  {...form.register("image", { validate: validateFile })}
                  className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
                {form.watch("image") && (
                  <p>Selected file: {form.watch("image")[0]?.name}</p>
                )}
              </div>
            </div>
            <Button
              disabled={
                form.formState.isSubmitting || form.formState.isSubmitSuccessful
              }
              type="submit"
              role="submit"
              aria-label="Update Cabin"
              className="w-full bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
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
      </DialogContent>
    </Dialog>
  );
}
