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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateDays } from "@/utils/custom-utils";
import { cruiseItinerarySchema } from "@/zod/schemas/cruise.schema";
import { CruiseItineraryType } from "@/zod/types/cruises.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cruiseItineraryApi } from "./cruise-itinerary-api";
import { useState } from "react";
import { CustomInput } from "@/components/custom-input";
import { addCruiseItineraryAction } from "@/actions/cruise.actions";

interface CruiseItineraryFormProps {
  cruises: CruisePropsType[];
}

export function CruiseItineraryForm({ cruises }: CruiseItineraryFormProps) {
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [cruiseDuration, setCruiseDuration] = useState<number>(0); // Default to 0
  const [itineraryDays, setItineraryDays] = useState<string[]>(
    generateDays(cruiseDuration)
  ); // Default based on initial duration

  const form = useForm<CruiseItineraryType>({
    resolver: zodResolver(cruiseItinerarySchema),
  });

  const handleShipChange = (value: string) => {
    const selectedCruise = cruises.find((c) => c.cruise_name === value);

    if (selectedCruise) {
      setCruiseDuration(parseInt(selectedCruise.duration));
      const newItineraryDays = generateDays(parseInt(selectedCruise.duration));
      setItineraryDays(newItineraryDays);
      const cruiseItinerary = cruiseItineraryApi.find(
        (c) => c.name === selectedCruise.cruise_id
      );
      setSelectedLocation(cruiseItinerary?.location || []);
      form.setValue("location", cruiseItinerary?.location[0] || ""); // Set first location as default
    } else {
      setCruiseDuration(0);
      setSelectedLocation([]);
      form.setValue("location", ""); // Reset location
    }
  };

  const processForm = async (data: CruiseItineraryType) => {
    const res = await addCruiseItineraryAction(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orangeElement dark:bg-orangeElement text-lightElement dark:text-lightElement"
        >
          Add Itinerary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Itinerary</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="cruise_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cruise</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleShipChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Cruise" />
                          </SelectTrigger>
                          <SelectContent>
                            {cruises.map((item) => (
                              <SelectItem
                                key={item.cruise_id}
                                value={item.cruise_name}
                              >
                                {item.cruise_name}
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
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {itineraryDays.map((item) => (
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
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            selectedLocation.length > 0
                              ? selectedLocation[0]
                              : ""
                          }
                          disabled={selectedLocation.length === 0}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedLocation.map((item) => (
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
                  name="arrive"
                  type="time"
                  label="Arrive"
                  placeholder="Arrive"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <CustomInput
                  control={form.control}
                  name="depart"
                  type="time"
                  label="Depart"
                  placeholder="Depart"
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
