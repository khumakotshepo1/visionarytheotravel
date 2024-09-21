import { User } from "next-auth";

import { sql } from "@/database";
import { cache } from "react";
import { auth } from "@/auth";

export const getAllUsers = cache(async () => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    if (session?.user?.role !== "ADMIN") {
      return {
        error: "Unauthorized",
      };
    }

    const { rows } = await sql.query("SELECT * FROM users ");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
});

export const getUserById = cache(
  async (id: number): Promise<User | undefined> => {
    try {
      const { rows } = await sql.query<User>(
        `SELECT * FROM users WHERE user_id = $1`,
        [id]
      );

      console.log({ rows: rows[0] });

      return rows[0] || null;
    } catch (error) {
      throw new Error("Failed to fetch user.");
    }
  }
);

export const getUserByEmail = cache(
  async (email: string): Promise<User | undefined> => {
    try {
      const { rows } = await sql.query<User>(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );

      return rows[0] || null;
    } catch (error) {
      throw new Error("Failed to fetch user.");
    }
  }
);

export const getVerificationTokenByEmail = cache(async (email: string) => {
  try {
    const { rows } = await sql.query(
      `SELECT * FROM verification_token WHERE email = $1`,
      [email]
    );

    return rows[0] || null;
  } catch (error) {
    return error;
  }
});

export const getVerificationTokenByToken = cache(async (token: string) => {
  try {
    const { rows } = await sql.query(
      `SELECT * FROM verification_token WHERE token = $1`,
      [token]
    );

    return rows[0] || null;
  } catch (error) {
    return error;
  }
});
