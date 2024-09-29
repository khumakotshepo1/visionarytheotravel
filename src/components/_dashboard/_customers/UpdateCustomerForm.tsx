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

import { Textarea } from "@/components/ui/textarea";
import { updateCustomerAction } from "@/actions/customer.action";

export function UpdateCustomerForm({
  customer,
}: {
  customer: CustomerPropsType;
}) {
  const { refresh } = useRouter();

  const form = useForm<CustomerType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.customer_email,
      phone_number: customer.phone_number,
      address: customer.address,
      gender: customer.gender,
      date_of_birth: customer.date_of_birth,
      id_number: customer.id_number,
      passport_number: customer.passport_number,
      passport_issue_date: customer.passport_issue_date,
      passport_expiry_date: customer.passport_expiry_date,
      passport_country: customer.passport_country,
    },
  });

  const genders: string[] = ["male", "female", "other"];

  const customerId = customer.customer_id;

  const processForm = async (data: CustomerType) => {
    const res = await updateCustomerAction(data, customerId);
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
        <button>Edit Customer</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
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
                  name="id_number"
                  label="ID Number"
                  placeholder="ID Number"
                  type="text"
                />
                <CustomInput
                  control={form.control}
                  name="passport_number"
                  label="Passport Number"
                  placeholder="Passport Number"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  control={form.control}
                  name="passport_issue_date"
                  label="Passport Issue Date"
                  placeholder="Passport Issue Date"
                  type="date"
                />
                <CustomInput
                  control={form.control}
                  name="passport_expiry_date"
                  label="Passport Expiry Date"
                  placeholder="Passport Expiry Date"
                  type="date"
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="871 temp street, midtown, cape town, 7441, south africa"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
