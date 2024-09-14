import { z } from "zod";
import {
  emailSchema,
  fullNameSchema,
  imageSchema,
  passwordSchema,
  phoneSchema,
} from "../schemas/settings.schema";

export type UserPasswordType = z.infer<typeof passwordSchema>;

export type UserEmailType = z.infer<typeof emailSchema>;

export type UserFullNameType = z.infer<typeof fullNameSchema>;

export type UserPhoneType = z.infer<typeof phoneSchema>;

export type UserImageType = z.infer<typeof imageSchema>;
