import { getMscShipsNames } from "@/server/ships.server";

export async function GET() {
  try {
    const ships = await getMscShipsNames();
    return Response.json(ships); // Respond with status 200 and the ships data
  } catch (error) {
    console.error(error);
  }
}
