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

import { useRouter } from "next/navigation";

import { CruiseBookingType } from "@/zod/types/cruises.type";
import { cruiseBookingSchema } from "@/zod/schemas/cruise.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CheckCheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { updateCruiseBookingAction } from "@/actions/cruise.actions";
import { CustomInput } from "@/components/custom-input";

export function UpdateCruiseBookingForm({
  cruises,
  customers,
  cruiseBooking,
}: {
  cruises: CruisePropsType[];
  customers: CustomerPropsType[];
  cruiseBooking: CruiseBookingPropsType;
}) {
  const [open, setOpen] = useState(false);

  const { refresh, back } = useRouter();

  const form = useForm<CruiseBookingType>({
    resolver: zodResolver(cruiseBookingSchema),
    defaultValues: {
      phone_number: cruiseBooking?.phone_number,
      cruise_name: cruiseBooking?.cruise_name,
      cruise_number_of_adults: String(cruiseBooking?.cruise_number_of_adults),
      cruise_number_of_kids: String(cruiseBooking?.cruise_number_of_kids),
    },
  });

  const cruiseBookingID = cruiseBooking?.cruise_booking_number;

  const processForm = async (data: CruiseBookingType) => {
    const res = await updateCruiseBookingAction(data, cruiseBookingID);
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

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="space-y-4 max-w-xl w-[450px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-1">Phone Number</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between"
                          >
                            {field.value
                              ? customers.find(
                                  (item) => item.phone_number === field.value
                                )?.phone_number
                              : "Select Phone Number..."}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Phone Number..." />
                            <CommandList>
                              <CommandEmpty>
                                No phone number found.
                              </CommandEmpty>
                              <CommandGroup>
                                {customers.map((item) => (
                                  <CommandItem
                                    key={item.phone_number}
                                    value={item.phone_number}
                                    onSelect={(currentValue) => {
                                      field.onChange(currentValue); // Update the field value
                                      setOpen(false);
                                    }}
                                  >
                                    <CheckCheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === item.phone_number
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {item.phone_number}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="cruise_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cruise</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                            <SelectValue placeholder="Select Cruise" />
                          </SelectTrigger>
                          <SelectContent>
                            {cruises.map((item) => (
                              <SelectItem
                                key={item.cruise_name}
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

              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  control={form.control}
                  label="Number of Adults"
                  name="cruise_number_of_adults"
                  placeholder="pax over 18"
                  type="number"
                />

                <CustomInput
                  control={form.control}
                  label="Number of Kids"
                  name="cruise_number_of_kids"
                  placeholder="pax under 18"
                  type="number"
                />
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
