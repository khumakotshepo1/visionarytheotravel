import { auth } from "@/auth";
import { sql } from "@/database";

import { cache } from "react";

export const getAllShips = cache(async () => {
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

    const { rows } = await sql.query("SELECT * FROM ships");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch ships.");
  }
});

export const getShipByName = cache(async (name: string) => {
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

    const { rows } = await sql.query("SELECT * FROM ships WHERE name = $1", [
      name,
    ]);

    return rows[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch ship by name.");
  }
});

export const getMscShipsClasses = cache(async () => {
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

    const { rows } = await sql.query(
      "SELECT DISTINCT class FROM msc_cruise_ships"
    );

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch ships classes.");
  }
});

export const getMscShipsNames = cache(async () => {
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

    const { rows } = await sql.query("SELECT name FROM msc_cruise_ships");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch ships names.");
  }
});

export const getAllCabins = cache(async () => {
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

    const { rows } = await sql.query(
      "SELECT c.*, s.name as ship FROM cabins c JOIN ships s ON s.ship_id = c.ship_id"
    );

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch cabins.");
  }
});
