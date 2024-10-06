"use client";

import { addCruiseAction } from "@/actions/cruise.actions";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CruiseType } from "@/zod/types/cruises.type";
import { cruiseSchema } from "@/zod/schemas/cruise.schema";
import { CustomInput } from "@/components/custom-input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { cruiseItineraryApi } from "../_itineraries/cruise-itinerary-api";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CruisesForm({ ships }: { ships: ShipPropsType[] }) {
  const { refresh, back } = useRouter();

  const [mapImagePreview, setMapImagePreview] = useState<string | null>(null);
  const [cruiseImagePreview, setCruiseImagePreview] = useState<string | null>(
    null
  );

  const form = useForm<CruiseType>({
    resolver: zodResolver(cruiseSchema),
  });

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected
    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const ports: string[] = ["durban", "cape town"];

  const processForm = async (data: CruiseType) => {
    const formData = new FormData();

    formData.append("map_image", data.map_image[0]);
    formData.append("cruise_image", data.cruise_image[0]);
    formData.append("cruise_destination", data.cruise_destination);
    formData.append("cruise_name", data.cruise_name);
    formData.append("ship_id", data.ship_id);
    formData.append("description", data.description);
    formData.append("embarkation_date", data.embarkation_date.toISOString());
    formData.append(
      "disembarkation_date",
      data.disembarkation_date.toISOString()
    );
    formData.append("duration", data.duration);
    formData.append("departure_port", data.departure_port);
    formData.append("cruise_price", data.cruise_price);

    const res = await addCruiseAction(formData);
    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);
      form.reset();
      refresh();
      setTimeout(() => {
        back();
      }, 2000);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="space-y-4 max-sm-w-xl w-[450px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
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
                          <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                            <SelectValue placeholder="Select a destination" />
                          </SelectTrigger>
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
                <CustomInput
                  control={form.control}
                  name="cruise_name"
                  label="Cruise Name"
                  placeholder="Cruise Name"
                  type="text"
                />
              </div>
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
                        <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                          <SelectValue placeholder="Select ship" />
                        </SelectTrigger>
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
              <div className="grid grid-cols-2 gap-2">
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
                          <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                            <SelectValue placeholder="Select port" />
                          </SelectTrigger>
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
                <CustomInput
                  control={form.control}
                  name="duration"
                  label="Duration"
                  placeholder="Duration"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  control={form.control}
                  name="embarkation_date"
                  label="Embarkation Date"
                  placeholder="Embarkation Date"
                  type="date"
                />
                <CustomInput
                  control={form.control}
                  name="disembarkation_date"
                  label="Disembarkation Date"
                  placeholder="Disembarkation Date"
                  type="date"
                />
              </div>
              <CustomInput
                control={form.control}
                name="cruise_price"
                label="Cruise Price"
                placeholder="Cruise Price"
                type="number"
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="map_image">
                    <span className="flex gap-2 items-center justify-center py-3 border-2 border-dashed border-foreground">
                      <CloudUploadIcon className="h-4 w-4" /> Map Image
                    </span>
                  </Label>
                  <Input
                    id="map_image"
                    type="file"
                    {...form.register("map_image", { validate: validateFile })}
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, setMapImagePreview)}
                    required
                  />
                  {mapImagePreview && (
                    <Image
                      src={mapImagePreview}
                      width={200}
                      height={200}
                      alt="Map Preview"
                    />
                  )}
                  <FormMessage />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="cruise_image">
                    <span className="flex gap-2 items-center justify-center py-3 border-2 border-dashed border-foreground">
                      <CloudUploadIcon className="h-4 w-4" /> Cruise Image
                    </span>
                  </Label>
                  <Input
                    id="cruise_image"
                    type="file"
                    {...form.register("cruise_image", {
                      validate: validateFile,
                    })}
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, setCruiseImagePreview)}
                    required
                  />
                  {cruiseImagePreview && (
                    <Image
                      src={cruiseImagePreview}
                      width={200}
                      height={200}
                      alt="Cruise Preview"
                    />
                  )}
                  <FormMessage />
                </div>
              </div>
            </div>
            <div className="grid gap-4 py-3">
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
