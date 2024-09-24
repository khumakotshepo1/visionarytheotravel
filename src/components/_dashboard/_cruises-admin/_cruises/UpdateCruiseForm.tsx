"use client";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CruiseType } from "@/zod/types/cruises.type";
import { cruiseSchema } from "@/zod/schemas/cruise.schema";
import { CustomInput } from "@/components/custom-input";
import { updateCruiseAction } from "@/actions/cruise.actions";
import { useRouter } from "next/navigation";

export function UpdateCruisesForm({ cruise }: { cruise: CruisePropsType }) {
  const { refresh } = useRouter();

  const form = useForm<CruiseType>({
    resolver: zodResolver(cruiseSchema),
    defaultValues: {
      ship_id: cruise.ship_name,
      cruise_name: cruise.cruise_name,
      description: cruise.description,
      embarkation_date: cruise.embarkation_date,
      disembarkation_date: cruise.disembarkation_date,
      duration: cruise.duration,
      departure_port: cruise.departure_port,
      cruise_price: cruise.cruise_price,
    },
  });

  console.log({ cruise });

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const ports: string[] = ["durban", "cape town"];

  const cruiseId = cruise.cruise_id;

  const processForm = async (data: CruiseType) => {
    const map_image = data.map_image[0] as File;
    const cruise_name = data.cruise_name;
    const ship = data.ship_id;
    const description = data.description;
    const embarkation_date = data.embarkation_date;
    const disembarkation_date = data.disembarkation_date;

    const duration = data.duration;
    const departure_port = data.departure_port;
    const cruise_price = data.cruise_price;

    const formData = new FormData();

    formData.append("map_image", map_image);
    formData.append("cruise_name", cruise_name);
    formData.append("ship_id", ship);
    formData.append("description", description);
    formData.append("embarkation_date", embarkation_date.toISOString());
    formData.append("disembarkation_date", disembarkation_date.toISOString());
    formData.append("duration", duration);
    formData.append("departure_port", departure_port);
    formData.append("cruise_price", cruise_price);

    const res = await updateCruiseAction(formData, cruiseId);

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
        <Button
          variant="outline"
          className="bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
        >
          Edit Cruise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Cruise</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <CustomInput
                  control={form.control}
                  name="cruise_name"
                  label="Cruise Name"
                  placeholder="Cruise Name"
                  type="text"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <CustomInput
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="Description"
                  type="text"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="departure_port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departure Port</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="select port" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ports.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
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
                <CustomInput
                  control={form.control}
                  name="embarkation_date"
                  label="Embarkation Date"
                  placeholder="Embarkation Date"
                  type="date"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <CustomInput
                  control={form.control}
                  name="disembarkation_date"
                  label="Disembarkation Date"
                  placeholder="Disembarkation Date"
                  type="date"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <CustomInput
                  control={form.control}
                  name="cruise_price"
                  label="Cruise Price"
                  placeholder="Cruise Price"
                  type="number"
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
                            <SelectItem value={cruise.ship_name}>
                              {cruise.ship_name}
                            </SelectItem>
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
                  {...form.register("map_image", { validate: validateFile })}
                  className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
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
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
