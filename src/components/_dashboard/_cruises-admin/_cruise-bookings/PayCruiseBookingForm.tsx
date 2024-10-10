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

import { CruiseBookingPaymentType } from "@/zod/types/cruises.type";
import { cruiseBookingPaymentSchema } from "@/zod/schemas/cruise.schema";

import { CruiseBookingPaymentAction } from "@/actions/cruise.actions";
import { CustomInput } from "@/components/custom-input";

export function PayCruiseBookingForm({
  cruiseBookingId,
}: {
  cruiseBookingId: string;
}) {

  const { refresh, back } = useRouter();

  const form = useForm<CruiseBookingPaymentType>({
    resolver: zodResolver(cruiseBookingPaymentSchema),
  });

  const paymentMethods = ["cash", "debit_card", "credit_card"];


  const processForm = async (data: CruiseBookingPaymentType) => {
    const res = await CruiseBookingPaymentAction(data, cruiseBookingId);
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
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cruise_payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border-0 border-b-2 rounded-none">
                            <SelectValue placeholder="Select Cruise" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((item) => (
                              <SelectItem
                                key={item}
                                value={item}
                              >
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

              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  control={form.control}
                  label="Cruise Payment Amount"
                  name="cruise_payment_amount"
                  placeholder="Cruise Payment Amount"
                  type="number"
                />
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
                  "Pay"
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
