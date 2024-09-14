import { z } from "zod";
import {
  newPasswordSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../schemas/auth.schema";

export type UserLoginType = z.infer<typeof userLoginSchema>;

export type UserRegisterType = z.infer<typeof userRegisterSchema>;

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export type NewPasswordType = z.infer<typeof newPasswordSchema>;
