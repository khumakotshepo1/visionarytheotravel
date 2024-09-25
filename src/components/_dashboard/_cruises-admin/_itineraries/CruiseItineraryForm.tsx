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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cruiseItineraryApi } from "./cruise-itinerary-api";
import { useState } from "react";
import { CustomInput } from "@/components/custom-input";
import { addCruiseItineraryAction } from "@/actions/cruise.actions";
import { useRouter } from "next/navigation";

interface CruiseItineraryFormProps {
  cruises: CruisePropsType[];
}

export function CruiseItineraryForm({ cruises }: CruiseItineraryFormProps) {
  const { refresh } = useRouter();

  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [cruiseDuration, setCruiseDuration] = useState<number>(0);
  const [itineraryDays, setItineraryDays] = useState<string[]>(
    generateDays(cruiseDuration)
  );

  const form = useForm<CruiseItineraryType>({
    resolver: zodResolver(cruiseItinerarySchema),
  });

  const handleShipChange = (value: string) => {
    const selectedCruise = cruises.find((c) => c.cruise_destination === value);

    if (selectedCruise) {
      const duration = parseInt(selectedCruise.duration);
      setCruiseDuration(duration);
      setItineraryDays(generateDays(duration));

      // Correctly match the cruise itinerary using cruise_name
      const cruiseItinerary = cruiseItineraryApi.find(
        (c) => c.name === selectedCruise.cruise_destination
      );

      if (cruiseItinerary) {
        setSelectedLocation(cruiseItinerary.location);
        form.setValue("location", cruiseItinerary.location[0] || ""); // Set first location as default
      } else {
        setSelectedLocation([]);
        form.setValue("location", "");
      }
    } else {
      setCruiseDuration(0);
      setSelectedLocation([]);
      form.setValue("location", "");
    }
  };

  const processForm = async (data: CruiseItineraryType) => {
    const res = await addCruiseItineraryAction(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
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
              {/* Cruise Selection */}
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
                              value={item.cruise_destination}
                            >
                              {item.cruise_destination}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Day Selection */}
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

              {/* Location Selection */}
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
                          selectedLocation.length > 0 ? selectedLocation[0] : ""
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

              {/* Arrival Time */}
              <CustomInput
                control={form.control}
                name="arrive"
                type="time"
                label="Arrive"
                placeholder="Arrive"
              />

              {/* Departure Time */}
              <CustomInput
                control={form.control}
                name="depart"
                type="time"
                label="Depart"
                placeholder="Depart"
              />
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
