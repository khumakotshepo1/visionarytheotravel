"use client";

import { addCruiseAction } from "@/actions/cruise.actions";
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

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CruiseType } from "@/zod/types/cruises.type";
import { cruiseSchema } from "@/zod/schemas/cruise.schema";
import { CustomInput } from "@/components/custom-input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { cruiseItineraryApi } from "../_itineraries/cruise-itinerary-api";

export function CruisesForm({ ships }: { ships: ShipPropsType[] }) {
  const { refresh } = useRouter();

  const form = useForm<CruiseType>({
    resolver: zodResolver(cruiseSchema), // Apply the zodResolver
  });

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const ports: string[] = ["durban", "cape town"];

  const processForm = async (data: CruiseType) => {
    console.log({ data });

    const map_image = data.map_image[0] as File;
    const cruise_image = data.cruise_image[0] as File;
    const cruise_destination = data.cruise_destination;
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
    formData.append("cruise_image", cruise_image);
    formData.append("cruise_destination", cruise_destination);
    formData.append("cruise_name", cruise_name);
    formData.append("ship_id", ship);
    formData.append("description", description);
    formData.append("embarkation_date", embarkation_date.toISOString());
    formData.append("disembarkation_date", disembarkation_date.toISOString());
    formData.append("duration", duration);
    formData.append("departure_port", departure_port);
    formData.append("cruise_price", cruise_price);

    const res = await addCruiseAction(formData);

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
          Add Cruise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Cruise</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="cruise_destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Name</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                                <SelectValue placeholder="select a destination" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cruiseItineraryApi.map((item) => (
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
                  <CustomInput
                    control={form.control}
                    name="cruise_name"
                    label="Cruise Name"
                    placeholder="Cruise Name"
                    type="text"
                  />
                </div>
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
                            <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                              <SelectValue placeholder="select ship" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ships.map((item) => (
                              <SelectItem
                                key={item.ship_name}
                                value={item.ship_name}
                              >
                                {item.ship_name}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about this cruise"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
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
                              <SelectTrigger className="w-[180px] border-0 border-b-2 rounded-none">
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
                    name="duration"
                    label="Duration"
                    placeholder="Duration"
                    type="number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
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

              <div className="grid grid-cols-2 gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link">Map Image</Label>
                  <Input
                    id="link"
                    type="file"
                    {...form.register("map_image", { validate: validateFile })}
                    className="w-full border-0 border-b-2 rounded-none border-black dark:border-white"
                    required
                  />
                </div>
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link">Cruise Image</Label>
                  <Input
                    id="link"
                    type="file"
                    {...form.register("cruise_image", {
                      validate: validateFile,
                    })}
                    className="w-full border-0 border-b-2 rounded-none border-black dark:border-white"
                    required
                  />
                </div>
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
