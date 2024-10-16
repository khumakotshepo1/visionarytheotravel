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
import { cruiseItinerarySchema } from "@/zod/schemas/cruise.schema";
import { CruiseItineraryType } from "@/zod/types/cruises.type";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomInput } from "@/components/custom-input";
import { updateCruiseItineraryAction } from "@/actions/cruise.actions";
import { useRouter } from "next/navigation";

interface CruiseItineraryFormProps {
  cruiseIti: CruiseItineraryPropsType;
}

export function UpdateCruiseItineraryForm({
  cruiseIti,
}: CruiseItineraryFormProps) {
  const { refresh } = useRouter();

  const form = useForm<CruiseItineraryType>({
    resolver: zodResolver(cruiseItinerarySchema),
    defaultValues: {
      cruise_id: cruiseIti.cruise_id,
      day: cruiseIti.day,
      location: cruiseIti.location,
      arrive: cruiseIti.arrive,
      depart: cruiseIti.depart,
    },
  });

  const cruise_itinerary_id = cruiseIti.cruise_itinerary_id;

  const processForm = async (data: CruiseItineraryType) => {
    const res = await updateCruiseItineraryAction(data, cruise_itinerary_id);
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
        <button>Edit Itinerary</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Itinerary</DialogTitle>
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Cruise" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={cruiseIti.cruise_id}>
                              {cruiseIti.cruise_id}
                            </SelectItem>
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
                            <SelectItem value={cruiseIti.day}>
                              {cruiseIti.day}
                            </SelectItem>
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
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={cruiseIti.location}>
                              {cruiseIti.location}
                            </SelectItem>
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
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
