import { sql } from "@/database";

export async function getAllCustomers() {
  try {
    const { rows } = await sql.query("SELECT * FROM customers");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch customers.");
  }
}

export async function getCustomerById(id: number) {
  try {
    const { rows } = await sql.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [id]
    );

    return rows[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch customer by id.");
  }
}

export async function getCustomerByEmail(email: string) {
  try {
    const { rows } = await sql.query(
      "SELECT * FROM customers WHERE customer_email = $1",
      [email]
    );

    return rows[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch customer by id.");
  }
}

export async function getCustomerByPhoneNumber(phoneNumber: string) {
  try {
    const { rows } = await sql.query(
      "SELECT * FROM customers WHERE phone_number = $1",
      [phoneNumber]
    );

    return rows[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch customer by id.");
  }
}

export async function getAllBookings() {
  try {
    const { rows } = await sql.query("SELECT * FROM customers");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch customers.");
  }
}
