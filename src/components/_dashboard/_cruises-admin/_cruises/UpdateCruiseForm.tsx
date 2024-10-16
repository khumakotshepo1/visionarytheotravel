
"use client";

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
import { updateCruiseAction } from "@/actions/cruise.actions";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cruiseItineraryApi } from "../_itineraries/cruise-itinerary-api";
import { CloudUploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export function UpdateCruisesForm({ cruise, cruiseDate, ship }: { cruise: CruisePropsType, cruiseDate: CruiseDatePropsType, ship: ShipPropsType }) {
  const { refresh, back } = useRouter();
  const [mapImagePreview, setMapImagePreview] = useState<string | null>(null);
  const [cruiseImagePreview, setCruiseImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setMapImagePreview(cruiseDate?.map_image)
    setCruiseImagePreview(cruise?.cruise_image)
  }, [cruiseDate?.map_image, cruise?.cruise_image]

  )

  const form = useForm<CruiseType>({
    resolver: zodResolver(cruiseSchema),
    defaultValues: {
      ship_id: ship?.ship_name,
      cruise_name: cruise?.cruise_name,
      description: cruise?.description,
      embarkation_date: cruiseDate?.embarkation_date,
      disembarkation_date: cruiseDate?.disembarkation_date,
      duration: cruiseDate?.duration,
      departure_port: cruiseDate?.departure_port,
      cruise_price: cruiseDate?.cruise_price,
      cruise_destination: cruiseDate?.cruise_destination,
    },
  });

  const validateFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return true; // No file selected

    const isImage = file.type.startsWith("image/");
    return isImage || "Please select a valid image file.";
  };

  const ports: string[] = ["durban", "cape town"];
  const cruiseId = cruise?.cruise_id;
  const cruiseDateId = cruiseDate?.cruise_date_id;

  const processForm = async (data: CruiseType) => {
    const formData = new FormData();
    const { map_image, cruise_image, cruise_destination, cruise_name, ship_id, description, embarkation_date, disembarkation_date, duration, departure_port, cruise_price } = data;

    formData.append("map_image", map_image[0]);
    formData.append("cruise_image", cruise_image[0]);
    formData.append("cruise_destination", cruise_destination);
    formData.append("cruise_name", cruise_name);
    formData.append("ship_id", ship_id);
    formData.append("description", description);
    formData.append("embarkation_date", embarkation_date.toISOString());
    formData.append("disembarkation_date", disembarkation_date.toISOString());
    formData.append("duration", duration);
    formData.append("departure_port", departure_port);
    formData.append("cruise_price", cruise_price);

    const res = await updateCruiseAction(formData, cruiseId, cruiseDateId);

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);
      form.reset();
      refresh();
      setTimeout(() => back(), 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setPreview: (url: string | null) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="space-y-4 max-w-xl w-[450px]">
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ship.ship_name}>{ship.ship_name}</SelectItem>
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
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="departure_port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departure Port</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-[180px]">
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
                    <Image src={mapImagePreview} width={200} height={200} alt="Map Preview" />
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
                    {...form.register("cruise_image", { validate: validateFile })}
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, setCruiseImagePreview)}
                    required
                  />
                  {cruiseImagePreview && (
                    <Image src={cruiseImagePreview} width={200} height={200} alt="Cruise Preview" />
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
                onClick={() => back()}
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
