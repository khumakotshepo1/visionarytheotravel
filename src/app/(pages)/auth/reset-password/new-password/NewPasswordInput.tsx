import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { newPasswordType } from "@/types/zodTypes";

import { Control, FieldPath } from "react-hook-form";

type loginProps = {
  control: Control<newPasswordType>;
  label: string;
  name: FieldPath<newPasswordType>;
  placeholder: string;
};

export const NewPasswordInput = ({
  control,
  label,
  name,
  placeholder,
}: loginProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={name === "password" ? "password" : "text"}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
