import { sql } from "@/database";

import { cache } from "react";

export const getAllShips = cache(async () => {
  try {
    const { rows } = await sql.query("SELECT * FROM ships");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch ships.");
  }
});

export const getShipByName = cache(async (shipName: string) => {
  try {
    const { rows } = await sql.query(
      "SELECT * FROM ships WHERE ship_name = $1",
      [shipName]
    );

    return rows[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch ship by name.");
  }
});

export const getAllCabins = cache(async () => {
  try {
    const { rows } = await sql.query(
      "SELECT c.*, s.ship_name as ship FROM cabins c JOIN ships s ON s.ship_id = c.ship_id"
    );

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch cabins.");
  }
});

export const getAllCruises = cache(async () => {
  try {
    const { rows } = await sql.query("SELECT * FROM cruises");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch cruises.");
  }
});

export const getAllCruiseItineraries = cache(async () => {
  try {
    const { rows } = await sql.query("SELECT * FROM cruise_itineraries");

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch cruise itineraries.");
  }
});
