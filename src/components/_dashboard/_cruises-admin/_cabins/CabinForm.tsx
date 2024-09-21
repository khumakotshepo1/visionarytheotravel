"use client";

import { addCabinAction } from "@/actions/cruise.actions";
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

type ShipNames = { name: string };

export function CabinForm({ shipsNames }: { shipsNames: ShipNames[] }) {
  const form = useForm<CabinType>({
    resolver: zodResolver(cabinSchema), // Apply the zodResolver
  });

  const cabinNames = [
    { name: "Inside" },
    { name: "Oceanview" },
    { name: "Balcony" },
    { name: "Suite" },
  ];

  const { refresh } = useRouter();

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const processForm = async (data: CabinType) => {
    console.log({ data });

    const image = data.image[0] as File;
    const name = data.name;
    const ship_id = data.ship_id;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("ship_id", ship_id);

    console.log({ formData });

    const res = await addCabinAction(formData);

    if (res?.error) {
      console.log(res.error);
      toast.error(res.error);
    }

    if (res?.success) {
      console.log(res.success);
      toast.success(res.success);
      setTimeout(() => {
        refresh();
      }, 2000);
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cabin Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="select cabin type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cabinNames.map((item) => (
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
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="select ship" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shipsNames.map((item) => (
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
              </div>
            </div>
            <Button
              disabled={
                form.formState.isSubmitting || form.formState.isSubmitSuccessful
              }
              type="submit"
              role="submit"
              aria-label="Change Full Name"
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
