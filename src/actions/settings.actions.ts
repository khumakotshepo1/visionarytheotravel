"use server";

import cloudinary from "@/lib/cloudinary";
import { auth } from "@/auth";
import { sql } from "@/database";
import { getErrorMessage } from "@/utils/error-message";
import { generateVerificationToken } from "@/utils/token";
import { sendEmailVerification } from "@/utils/mail";
import {
  UserEmailType,
  UserFullNameType,
  UserPhoneType,
} from "@/zod/types/settings.type";
import {
  emailSchema,
  fullNameSchema,
  phoneSchema,
} from "@/zod/schemas/settings.schema";

export const fullNameAction = async (data: UserFullNameType) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const userId = session?.user?.user_id;

    const results = fullNameSchema.safeParse(data);

    if (results.success) {
      const { last_name, first_name } = results.data;

      if (!first_name) {
        return {
          error: "First name is required",
        };
      }

      if (!last_name) {
        return {
          error: "Last name is required",
        };
      }

      await sql.query(
        `UPDATE users SET first_name = $1, last_name = $2,  updated_at = NOW() WHERE user_id = $2`,
        [first_name, last_name, userId]
      );

      return {
        success: "Full name updated successfully",
      };
    }
  } catch (error) {
    console.error("Error during fullNameAction:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};

export const emailAction = async (data: UserEmailType) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const userId = session?.user?.user_id;

    const results = emailSchema.safeParse(data);

    if (results.success) {
      const { email } = results.data;

      const { rows: emailExists } = await sql.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );

      if (emailExists.length > 0) {
        return {
          error: "Email address already exists",
        };
      }

      await sql.query(
        `UPDATE users SET email = $1, email_verified = null, updated_at = NOW() WHERE user_id = $2`,
        [email, userId]
      );

      const verificationToken = await generateVerificationToken(email);

      await sendEmailVerification(email, verificationToken.token);

      return {
        success: "Email address updated successfully",
      };
    }
  } catch (error) {
    console.error("Error during updating email:", error);

    return {
      error: getErrorMessage(error),
    };
  }
};

export const phoneAction = async (data: UserPhoneType) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    const userId = session?.user?.user_id;

    const results = phoneSchema.safeParse(data);

    if (results.success) {
      const { phone } = results.data;

      const { rows: userExists } = await sql.query(
        `
        SELECT * FROM users WHERE phone = $1`,
        [phone]
      );

      if (userExists.length > 0) {
        return {
          error: "Phone number already exists",
        };
      }

      await sql.query(
        `UPDATE users SET phone = $1, updated_at = NOW() WHERE user_id = $2`,
        [phone, userId]
      );

      return {
        success: "Phone number updated successfully",
      };
    }
  } catch (error) {
    console.error("Error during updating phone:", error);

    return {
      error: getErrorMessage(error),
    };
  }
};

export const userImageAction = async (formData: FormData) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const userId = session?.user?.user_id;

  try {
    const file = formData.get("image") as File;

    if (file.size > 1000000) {
      return {
        error: "File size exceeds 1mb",
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing images in the folder
    await cloudinary.api.delete_resources_by_prefix(
      `profile-pictures/${userId}`
    );

    // Upload the new image
    const upload = new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: `profile-pictures/${userId}`,
            width: 100, // Set the desired width
            height: 100, // Set the desired height
            crop: "fill", // Crop the image to fit the specified dimensions
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (error: any, result: any) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result?.secure_url);
          }
        )
        .end(buffer);
    });

    const image = await upload;

    await sql.query(
      `UPDATE users SET image = $1 , updated_at = NOW() WHERE user_id = $2 RETURNING *`,
      [image, userId]
    );

    return {
      success: "Image uploaded successfully",
    };
  } catch (error) {

    return {
      error: getErrorMessage(error),
    };
  }
};

export const emailVerificationAction = async (email: string) => {
  try {
    const verificationToken = await generateVerificationToken(email);

    const sent = await sendEmailVerification(email, verificationToken.token);

    if (sent) {
      return {
        success: "Verification email sent successfully",
      };
    }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const newVerificationTokenAction = async (token: string) => {
  try {
    const { rows: existingToken } = await sql.query(
      `SELECT * FROM verification_token WHERE token = $1`,
      [token]
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
        [existingToken[0].email]
      );

      if (!existingUser) {
        return {
          error: "Invalid token",
        };
      }

      await sql.query(
        `UPDATE users SET email_verified = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *`,
        [true, existingUser[0].email, existingUser[0].id]
      );

      await sql.query(`DELETE FROM verification_token WHERE token = $1`, [
        token,
      ]);

      return {
        success: "Email verified successfully",
      };
    }
  } catch (error) {
    console.error("Error during emailVerificationAction:", error);
    return null;
  }
};
