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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomInput } from "@/components/custom-input";
import { useRouter } from "next/navigation";
import { CustomerType } from "@/zod/types/customer.type";
import { customerSchema } from "@/zod/schemas/customer.schema";
import { addCruiseBookingAction } from "@/actions/cruise.actions";

export function QuoteForm({ cruise }: { cruise: CruisePropsType }) {
  const { refresh } = useRouter();

  const form = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
  });

  const genders: string[] = ["male", "female", "other"];
  const cruiseId = cruise.cruise_id;

  const processForm = async (data: CustomerType) => {
    const res = await addCruiseBookingAction(data, cruiseId);
    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
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
          Get A Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{cruise.cruise_name} Quote</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  control={form.control}
                  name="first_name"
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                />
                <CustomInput
                  control={form.control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Email"
                  type="text"
                />
                <CustomInput
                  control={form.control}
                  name="phone_number"
                  label="Phone Number"
                  placeholder="Phone Number"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genders.map((item) => (
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
                  name="date_of_birth"
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  type="date"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  control={form.control}
                  name="number_of_adults"
                  label="Number of Adults"
                  placeholder="Adults 18 years and above"
                  type="number"
                />
                <CustomInput
                  control={form.control}
                  name="number_of_kids"
                  label="Number of Kids"
                  placeholder="Kids under 18 years"
                  type="number"
                />
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
