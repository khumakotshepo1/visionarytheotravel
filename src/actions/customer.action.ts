"use server";

import { sql } from "@/database";
import { getCustomerByEmail } from "@/server/ customer.server";
import { getErrorMessage } from "@/utils/error-message";
import { customerSchema } from "@/zod/schemas/customer.schema";
import { CustomerType } from "@/zod/types/customer.type";

export async function addCustomerAction(data: CustomerType) {
  try {
    const results = customerSchema.safeParse(data);

    if (!results.success) {
      return {
        error: results.error.errors[0].message,
      };
    }

    const {
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      gender,
      id_number,
      passport_number,
      passport_issue_date,
      passport_expiry_date,
      passport_country,
      address,
    } = results.data;

    const customerExists = await getCustomerByEmail(email);

    if (customerExists) {
      return {
        error: "Customer already exists",
      };
    }

    await sql.query(
      "INSERT INTO customers (first_name, last_name, customer_email, phone_number, date_of_birth, gender, id_number, passport_number, passport_issue_date, passport_expiry_date, passport_country, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        first_name,
        last_name,
        email,
        phone_number,
        date_of_birth,
        gender,
        id_number,
        passport_number,
        passport_issue_date,
        passport_expiry_date,
        passport_country,
        address,
      ]
    );

    return {
      success: "Customer added successfully",
    };
  } catch (error) {
    console.log({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}
