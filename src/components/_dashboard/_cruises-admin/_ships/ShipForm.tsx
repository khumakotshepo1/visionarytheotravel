"use client";

import { useState } from "react";
import { addShipAction } from "@/actions/cruise.actions";
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
import { shipSchema } from "@/zod/schemas/cruise.schema";
import { ShipType } from "@/zod/types/cruises.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mscShipsApi } from "./msc-ships-api";
import { useRouter } from "next/navigation";

export function ShipForm() {
  const { refresh } = useRouter();

  const form = useForm<ShipType>({
    resolver: zodResolver(shipSchema),
  });

  const [selectedShipClass, setSelectedShipClass] = useState<string>("");

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const processForm = async (data: ShipType) => {
    console.log({ data });

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
    }
  };

  // Handle ship selection change
  const handleShipChange = (value: string) => {
    const ship = mscShipsApi.find((s) => s.name === value);
    if (ship) {
      setSelectedShipClass(ship.class);
      form.setValue("ship_class", ship.class); // Optionally set ship class based on selected ship
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
        >
          Add Ship
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Ship</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
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
                          <SelectTrigger className="w-[180px]">
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
                          <SelectTrigger className="w-[180px]">
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
                <Label htmlFor="ship_image" className="sr-only">
                  Image
                </Label>
                <Input
                  id="ship_image"
                  type="file"
                  {...form.register("ship_image", { validate: validateFile })}
                  className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
                {/* {form.watch("ship_image") && (
                  <p>Selected file: {form.watch("ship_image")[0]}</p>
                )} */}
              </div>
            </div>
            <DialogClose asChild>
              <Button
                disabled={
                  form.formState.isSubmitting ||
                  form.formState.isSubmitSuccessful
                }
                type="submit"
                role="submit"
                aria-label="Save Ship Details"
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
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
