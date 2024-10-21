import { sql } from "@/database";

import { cache } from "react";

export const getAllShips = cache(async (): Promise<ShipPropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<ShipPropsType>("SELECT * FROM ships");

    return rows || null;
  } catch (error) {
    console.log("Error fetching ships:", error);
    throw new Error("Failed to fetch ships.");
  }
});

export const getShipByName = cache(async (shipName: string): Promise<ShipPropsType | undefined> => {
  try {
    const { rows } = await sql.query<ShipPropsType>(
      "SELECT * FROM ships WHERE ship_name = $1",
      [shipName],
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching ship by name:", error);
    throw new Error("Failed to fetch ship by name.");
  }
});

export const getShipById = cache(async (shipId: number): Promise<ShipPropsType | undefined> => {
  try {
    const { rows } = await sql.query<ShipPropsType>(
      "SELECT * FROM ships WHERE ship_id = $1",
      [shipId],
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching ship by id:", error);
    throw new Error("Failed to fetch ship by id.");
  }
});

export const getAllCabins = cache(async (): Promise<CabinPropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<CabinPropsType>(
      "SELECT c.*, s.ship_name as ship FROM cabins c JOIN ships s ON s.ship_id = c.ship_id",
    );

    return rows || null;
  } catch (error) {
    console.log("Error fetching cabins:", error);
    throw new Error("Failed to fetch cabins.");
  }
});

export const getCabinsByShipId = cache(async (ship_id: number): Promise<CabinPropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<CabinPropsType>(
      "SELECT * FROM cabins WHERE ship_id = $1",
      [ship_id],
    );

    return rows || null;
  } catch (error) {
    console.log("Error fetching cabins:", error);
    throw new Error("Failed to fetch cabins.");
  }
});

export const getAllCruises = cache(async (): Promise<CruisePropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<CruisePropsType>(
      "SELECT cd.*, c.* FROM cruise_dates cd JOIN cruises c ON c.cruise_id = cd.cruise_id",
    );

    return rows || null;
  } catch (error) {
    console.log("Error fetching cruises:", error);
    throw new Error("Failed to fetch cruises.");
  }
});

export const getCruiseById = cache(async (cruiseId: number): Promise<CruisePropsType | null> => {
  try {
    const { rows } = await sql.query<CruisePropsType>(
      "SELECT cd.*, c.* FROM cruise_dates cd JOIN cruises c ON c.cruise_id = cd.cruise_id WHERE c.cruise_id = $1",
      [cruiseId],
    );

    return rows.length > 0 ? rows[0] : null; // Return null if no rows are found
  } catch (error) {
    console.error("Error fetching cruise by id:", error); // Log the error for debugging
    throw new Error("Failed to fetch cruise by id."); // Re-throw with a generic message
  }
});

export const getCruiseByName = cache(async (cruiseName: string): Promise<CruisePropsType | undefined> => {
  try {
    const { rows } = await sql.query<CruisePropsType>(
      "SELECT * FROM cruises WHERE cruise_name = $1",
      [cruiseName],
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching cruise by name:", error);
    throw new Error("Failed to fetch cruise by name.");
  }
});

export const getCruiseDateByCruiseId = cache(async (cruiseId: number): Promise<CruiseDatePropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<CruiseDatePropsType>(
      "SELECT cd.*, c.* FROM cruise_dates cd JOIN cruises c ON c.cruise_id = cd.cruise_id WHERE cd.cruise_id = $1",
      [cruiseId],
    );

    return rows || null;
  } catch (error) {
    console.error("Error fetching cruise date by id:", error);
    throw new Error("Failed to fetch cruise date by cruise id");
  }
});

export const getCruiseDateById = cache(async (cruiseDateId: number): Promise<CruiseDatePropsType | undefined> => {
  try {
    const { rows } = await sql.query<CruiseDatePropsType>(
      "SELECT * FROM cruise_dates WHERE cruise_date_id = $1",
      [cruiseDateId],
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching cruise date by id:", error);
    throw new Error("Failed to fetch cruise date by id");
  }
});
export const getCruiseByDestionation = cache(
  async (cruiseDestination: string): Promise<CruisePropsType | undefined> => {
    try {
      const { rows } = await sql.query<CruisePropsType>(
        "SELECT * FROM cruise_dates WHERE cruise_destination = $1",
        [cruiseDestination],
      );

      return rows[0] || null;
    } catch (error) {
      console.log("Error fetching cruise by destination:", error);
      throw new Error("Failed to fetch cruise by name.");
    }
  },
);

export const getAllCruiseItineraries = cache(async (): Promise<CruiseItineraryPropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<CruiseItineraryPropsType>(
      "SELECT ci.*, cd.* FROM cruise_itineraries ci JOIN cruise_dates cd ON cd.cruise_date_id = ci.cruise_date_id",
    );

    return rows || null;
  } catch (error) {
    console.log("Error fetching cruise itineraries:", error);
    throw new Error("Failed to fetch cruise itineraries.");
  }
});

export const getCruiseItinerariesByCruiseDateId = cache(
  async (cruiseDateId: number): Promise<CruiseItineraryPropsType[] | undefined> => {
    try {
      const { rows } = await sql.query<CruiseItineraryPropsType>(
        "SELECT * FROM cruise_itineraries WHERE cruise_date_id = $1",
        [cruiseDateId],
      );

      return rows || null;
    } catch (error) {
      console.log("Error fetching cruise itineraries by cruise date id:", error);
      throw new Error("Failed to fetch cruise itineraries by cruise id.");
    }
  },
);

export const getAllCruiseBookings = cache(async (): Promise<CruiseBookingPropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<CruiseBookingPropsType>(
      `SELECT cb.*, c.*, cu.*
       FROM cruise_bookings cb
       JOIN cruises c ON c.cruise_id = cb.cruise_id
       JOIN customers cu ON cu.customer_id = cb.customer_id`,
    );

    return rows || null;
  } catch (error) {
    console.log("Error fetching cruise bookings:", error);
    throw new Error("Failed to fetch cruise bookings.");
  }
});

export const getPreviousCruiseTotalPrice = cache(async (): Promise<PreviousCruiseTotalPricePropsType[] | undefined> => {
  try {
    const { rows } = await sql.query<PreviousCruiseTotalPricePropsType>("SELECT * FROM prev_cruise_total_price");

    return rows || null;
  } catch (error) {
    console.log("Error fetching previous cruise total price:", error);
    throw new Error("Failed to fetch previous cruise total price.");
  }
});

export const getCruiseBookingPaymentByCruiseBookingNumber = cache(
  async (cruiseBookingNumber: number): Promise<CruiseBookingPaymentPropsType[] | undefined> => {
    try {
      const { rows } = await sql.query<CruiseBookingPaymentPropsType>(
        "SELECT cruise_payment_amount FROM cruise_booking_payments WHERE cruise_booking_number = $1",
        [cruiseBookingNumber],
      );

      return rows || null;
    } catch (error) {
      console.log("Error fetching cruise booking payment by cruise booking number:", error);
      throw new Error(
        "Failed to fetch cruise booking payment by cruise booking number",
      );
    }
  },
);

export const getTotalCruisePaymentsByCruiseBookingNumber = cache(
  async (cruiseBookingNumber: number): Promise<number | undefined> => {
    try {
      const cruiseBookingPayments =
        (await getCruiseBookingPaymentByCruiseBookingNumber(
          cruiseBookingNumber,
        )) as CruiseBookingPaymentPropsType[];

      const totalCruisePayments = cruiseBookingPayments.reduce(
        (acc, cur) => acc + (Number(cur.cruise_payment_amount) || 0),
        0,
      );

      return totalCruisePayments;
    } catch (error) {
      console.error("Error fetching total cruise payments:", error);
      throw new Error("Failed to retrieve total cruise payments");
    }
  },
);
