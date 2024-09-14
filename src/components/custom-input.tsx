import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FieldValues, Control, Path } from "react-hook-form";

// Define Props interface with FieldValues constraint
interface Props<T extends FieldValues> {
  control: Control<T>; // Control object from react-hook-form
  label: string; // Label for the input field
  name: Path<T>; // Path to the field in the form schema T
  placeholder: string; // Placeholder text for the input field
  type: "text" | "number" | "password"; // Input type
}

// MembershipInput component with generic type T extending FieldValues
export const CustomInput = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  type,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name} // Ensure name is passed correctly as Path<T>
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
