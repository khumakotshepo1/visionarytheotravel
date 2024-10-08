export function generateDays(nights: number): string[] {
  const duration = nights + 1; // Add 1 to represent the number of days
  return Array.from({ length: duration }, (_, index) => `Day ${index + 1}`);
}
