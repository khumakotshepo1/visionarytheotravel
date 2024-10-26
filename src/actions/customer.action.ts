"use server";

import { sql } from "@/database";
import { getCustomerByEmail } from "@/server/customer.server";
import { getErrorMessage } from "@/utils/error-message";
import { customerSchema } from "@/zod/schemas/customer.schema";
import { CustomerType } from "@/zod/types/customer.type";
import { revalidatePath } from "next/cache";

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
    console.error({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function updateCustomerAction(data: CustomerType, id: string) {
  try {
    const customerId = parseInt(id);

    if (!customerId) {
      return {
        error: "Customer ID is required",
      };
    }

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
      "UPDATE customers SET first_name = $1, last_name = $2, customer_email=$3, phone_number=$4, date_of_birth=$5, gender=$6, id_number=$7, passport_number=$8, passport_issue_date=$9, passport_expiry_date=$10, passport_country=$11, address=$12 WHERE customer_id = $13",
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
        customerId,
      ]
    );

    return {
      success: "Customer updated successfully",
    };
  } catch (error) {
    console.error({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function deleteCustomerAction(id: string) {
  try {
    const customerId = parseInt(id);

    if (!customerId) {
      return {
        error: "Customer ID is required",
      };
    }

    await sql.query("DELETE FROM customers WHERE customer_id = $1", [
      customerId,
    ]);

    revalidatePath("/dashboard/admin/customers");

    return {
      success: "Customer deleted successfully",
    };
  } catch (error) {
    console.error({ bookingError: error });
    return {
      error: getErrorMessage(error),
    };
  }
}
