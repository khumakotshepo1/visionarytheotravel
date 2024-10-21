import { sql } from "@/database";

export async function getAllCustomers() {
  try {
    const { rows } = await sql.query("SELECT * FROM customers");

    return rows || null;
  } catch (error) {
    console.log("Error fetching customers", error);
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
    console.log("Error fetching customer by id", error);
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
    console.log("Error fetching customer by email", error);
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
    console.log("Error fetching customer by phone number", error);
    throw new Error("Failed to fetch customer by id.");
  }
}

export async function getAllBookings() {
  try {
    const { rows } = await sql.query("SELECT * FROM customers");

    return rows || null;
  } catch (error) {
    console.log("Error fetching bookings", error);
    throw new Error("Failed to fetch customers.");
  }
}

export async function getCruiseBookingByBookingNumber(
  cruiseBookingNumber: number
) {
  try {
    const { rows } = await sql.query(
      `SELECT cb.*, c.cruise_name, cu.phone_number
       FROM cruise_bookings cb
       JOIN cruises c ON c.cruise_id = cb.cruise_id
       JOIN customers cu ON cu.customer_id = cb.customer_id
       WHERE cb.cruise_booking_number = $1`,
      [cruiseBookingNumber]
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching booking by booking number", error);
    throw new Error("Failed to fetch booking by booking number.");
  }
}

export async function getCruiseBookingByCustomerId(customerId: number) {
  try {
    const { rows } = await sql.query(
      "SELECT * FROM cruise_bookings WHERE customer_id = $1",
      [customerId]
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching booking by customer id", error);
    throw new Error("Failed to fetch booking by customer id.");
  }
}
