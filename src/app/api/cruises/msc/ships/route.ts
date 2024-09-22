import { sql } from "@/database";

export async function GET() {
  try {
    const { rows } = await sql.query("SELECT name FROM msc_cruise_ships");
    return Response.json(rows); // Respond with status 200 and the ships data
  } catch (error) {
    console.error(error);
  }
}
