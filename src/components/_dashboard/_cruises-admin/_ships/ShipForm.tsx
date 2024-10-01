"use client";

import { useState } from "react";
import { addShipAction } from "@/actions/cruise.actions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

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
import { shipSchema } from "@/zod/schemas/cruise.schema";
import { ShipType } from "@/zod/types/cruises.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mscShipsApi } from "./msc-ships-api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CloudUploadIcon } from "lucide-react";

export function ShipForm() {
  const { refresh, back } = useRouter();
  const form = useForm<ShipType>({
    resolver: zodResolver(shipSchema),
  });

  const [selectedShipClass, setSelectedShipClass] = useState<string>("");
  const [shipImagePreview, setShipImagePreview] = useState<string | null>(null);

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const processForm = async (data: ShipType) => {
    const ship_image = data.ship_image[0] as File;
    const formData = new FormData();
    formData.append("ship_image", ship_image);
    formData.append("ship_name", data.ship_name);
    formData.append("ship_class", data.ship_class);

    const res = await addShipAction(formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
      form.reset();
      refresh();
      setTimeout(() => {
        back();
      }, 2000);
    }
  };

  const handleShipChange = (value: string) => {
    const ship = mscShipsApi.find((s) => s.name === value);
    if (ship) {
      setSelectedShipClass(ship.class);
      form.setValue("ship_class", ship.class); // Optionally set ship class based on selected ship
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setShipImagePreview(fileURL);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="space-y-4 max-sm-w-xl w-[450px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="w-full">
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="ship_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ship Name</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleShipChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                            <SelectValue placeholder="Ship Name" />
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
                <FormField
                  control={form.control}
                  name="ship_class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ship Class</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={selectedShipClass}
                        >
                          <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                            <SelectValue placeholder="Ship Class" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedShipClass && (
                              <SelectItem value={selectedShipClass}>
                                {selectedShipClass}
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid flex-1 gap-2">
                <Label htmlFor="ship_image">
                  <span className="flex gap-2 items-center justify-center py-3 border-2 border-dashed border-foreground">
                    <CloudUploadIcon className="h-4 w-4" /> Ship Image
                  </span>
                </Label>
                <Input
                  id="ship_image"
                  type="file"
                  {...form.register("ship_image", { validate: validateFile })}
                  onChange={handleImageChange}
                  className="sr-only block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
                {shipImagePreview && (
                  <div className="relative w-full h-48">
                    <Image
                      src={shipImagePreview}
                      alt="Ship Image Preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 py-3">
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

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full"
                onClick={() => {
                  back();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
