import { getCruiseBookingPaymentByCruiseBookingNumber } from "@/server/cruises.server";

export function generateDays(nights: number): string[] {
  const duration = nights + 1; // Add 1 to represent the number of days
  return Array.from({ length: duration }, (_, index) => `Day ${index + 1}`);
}

export async function getTotalCruisePaymentsByCruiseBookingNumber(cruiseBookingNumber: number): Promise<number> {
  try {
    const cruiseBookingPayments = await getCruiseBookingPaymentByCruiseBookingNumber(cruiseBookingNumber) as { cruise_payment_amount: string }[];

    const totalCruisePayments = cruiseBookingPayments.reduce(
      (acc, cur) => acc + (Number(cur.cruise_payment_amount) || 0),
      0
    );

    return totalCruisePayments;
  } catch (error) {
    console.error("Error fetching total cruise payments:", error);
    throw new Error("Failed to retrieve total cruise payments");
  }
}
