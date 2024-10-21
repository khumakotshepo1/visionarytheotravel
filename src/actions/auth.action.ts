"use server";

import { signIn, signOut } from "@/auth";
import { sql } from "@/database";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import {
  NewPasswordType,
  ResetPasswordType,
  UserLoginType,
  UserRegisterType,
} from "@/zod/types/auth.type";
import {
  newPasswordSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegisterSchema,
} from "@/zod/schemas/auth.schema";
import { hash } from "bcryptjs";
import { generateVerificationToken } from "@/utils/token";
import { sendPasswordReset } from "@/utils/mail";
import { getErrorMessage } from "@/utils/error-message";

export const registerAction = async (data: UserRegisterType) => {
  try {
    const results = userRegisterSchema.safeParse(data);

    if (results.success) {
      const {
        last_name,
        first_name,
        email,
        phone,
        password,
        confirm_password,
      } = results.data;

      console.log({
        last_name,
        first_name,
        email,
        phone,
        password,
        confirm_password,
      });

      const hashedPassword = await hash(password, 10);

      const { rows: userExists } = await sql.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
      );

      if (userExists.length > 0) {
        console.log("User already exists");
        return {
          error: "User already exists",
        };
      }

      const { rows: phoneExists } = await sql.query(
        `SELECT FROM users WHERE phone = $1`,
        [phone],
      );

      if (phoneExists.length > 0) {
        console.log("Cellphone number already exists");
        return {
          error: "Cellphone number already exists",
        };
      }

      const res = await sql.query(
        "INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [first_name, last_name, email, phone, hashedPassword],
      );

      if (res) {
        return {
          success: "User registered successfully",
        };
      }
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};

export const loginAction = async (data: UserLoginType) => {
  try {
    const results = userLoginSchema.safeParse(data);

    if (results.success) {
      const { email, password } = results.data;

      const res = await signIn("credentials", {
        email,
        password,

        redirect: false,
      });

      if (res) {
        return {
          success: "Login successful",
        };
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials.",
          };
        default:
          return {
            error: "Something went wrong.",
          };
      }
    }
    throw error;
  }
};

export const googleAction = async () => {
  await signIn("google");
};

export const signOutAction = async () => {
  await signOut();
};

export const resetPasswordAction = async (data: ResetPasswordType) => {
  try {
    const results = resetPasswordSchema.safeParse(data);
    if (results.success) {
      const { email } = results.data;

      const session = await sql.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);

      if (session && session.rows.length <= 0) {
        redirect("/auth/login");
      }

      const verificationToken = await generateVerificationToken(email);

      const sent = await sendPasswordReset(email, verificationToken.token);

      if (sent) {
        return {
          success: "Password reset email sent successfully",
        };
      }
    }
  } catch (error) {
    redirect("/auth/login");
  }
};

export const newPasswordAction = async (
  token: string,
  data: NewPasswordType,
) => {
  try {
    const results = newPasswordSchema.safeParse(data);

    if (results.success) {
      const { password, confirm_password } = results.data;

      if (password !== confirm_password) {
        return {
          error: "Passwords do not match",
        };
      }

      const hashedPassword = await hash(password, 10);

      if (!token) {
        return {
          error: "Invalid token",
        };
      }

      const { rows: existingToken } = await sql.query(
        `SELECT * FROM verification_token WHERE token = $1`,
        [token],
      );

      if (existingToken) {
        const hasExpired = new Date(existingToken[0].expires_at) < new Date();

        if (hasExpired) {
          return {
            error: "Token has expired",
          };
        }

        const { rows: existingUser } = await sql.query(
          `SELECT * FROM users WHERE email = $1`,
          [existingToken[0].email],
        );

        if (!existingUser) {
          return {
            error: "Invalid token",
          };
        }

        await sql.query(
          `UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
          [hashedPassword, existingUser[0].id],
        );

        await sql.query(`DELETE FROM verification_token WHERE t = $1`, [token]);

        return {
          success: "Password updated successfully",
        };
      }
    }
  } catch (error) {
    return null;
  }
};
