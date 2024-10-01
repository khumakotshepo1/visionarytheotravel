import { z } from "zod";

export const customerSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: "First name is required",
    })
    .toLowerCase(),
  last_name: z
    .string()
    .min(1, {
      message: "Last name is required",
    })
    .toLowerCase(),
  gender: z
    .string()
    .min(1, {
      message: "Gender is required",
    })
    .toLowerCase(),
  id_number: z
    .string()
    .min(1, {
      message: "ID number is required",
    })
    .max(13, {
      message: "ID number is not valid",
    })
    .optional(),
  date_of_birth: z.coerce.date(),
  passport_number: z
    .string()
    .min(1, {
      message: "Passport number is required",
    })
    .optional(),
  passport_issue_date: z.coerce.date().optional(),
  passport_expiry_date: z.coerce.date().optional(),
  passport_country: z.string().toLowerCase().optional(),
  email: z
    .string()
    .email({
      message: "Email is not valid",
    })
    .toLowerCase(),
  phone_number: z
    .string()
    .min(10, {
      message: "Phone number is not valid",
    })
    .max(10, {
      message: "Phone number is not valid",
    }),
  address: z
    .string()
    .min(1, {
      message: "Address is required",
    })
    .max(255, {
      message: "Address is not valid",
    })
    .toLowerCase()
    .optional(),
  cruise_number_of_adults: z
    .string()
    .min(1, {
      message: "Number of adults is required",
    })
    .optional(),
  cruise_number_of_kids: z
    .string()
    .min(1, {
      message: "Number of kids is required",
    })
    .optional(),
});
