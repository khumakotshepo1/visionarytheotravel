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

export const getCabinsByShipId = cache(async (ship_id: number) => {
  try {
    const { rows } = await sql.query(
      "SELECT * FROM cabins WHERE ship_id = $1",
      [ship_id]
    );

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch cabins.");
  }
});

export const getAllCruises = cache(async () => {
  try {
    const { rows } = await sql.query(
      "SELECT c.*, s.* FROM cruises c JOIN ships s ON s.ship_id = c.ship_id"
    );

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch cruises.");
  }
});

export const getCruiseById = cache(async (cruiseId: number) => {
  try {
    const { rows } = await sql.query(
      "SELECT c.*, s.* FROM cruises c JOIN ships s ON s.ship_id = c.ship_id WHERE cruise_id = $1",
      [cruiseId]
    );

    return rows[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch cruise by id.");
  }
});

export const getCruiseByName = cache(async (cruiseName: string) => {
  try {
    const { rows } = await sql.query(
      "SELECT * FROM cruises WHERE cruise_name = $1",
      [cruiseName]
    );

    return rows[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch cruise by name.");
  }
});

export const getAllCruiseItineraries = cache(async () => {
  try {
    const { rows } = await sql.query(
      "SELECT ci.*, c.cruise_name as cruise FROM cruise_itineraries ci JOIN cruises c ON c.cruise_id = ci.cruise_id"
    );

    return rows || null;
  } catch (error) {
    throw new Error("Failed to fetch cruise itineraries.");
  }
});

export const getCruiseItinerariesByCruiseId = cache(
  async (cruise_id: number) => {
    try {
      const { rows } = await sql.query(
        "SELECT * FROM cruise_itineraries WHERE cruise_id = $1",
        [cruise_id]
      );

      return rows || null;
    } catch (error) {
      throw new Error("Failed to fetch cruise itineraries by cruise id.");
    }
  }
);
