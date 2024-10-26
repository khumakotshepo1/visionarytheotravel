export function generateDays(nights: number): string[] {
  const duration = nights + 1; // Add 1 to represent the number of days
  return Array.from({ length: duration }, (_, index) => `Day ${index + 1}`);
}

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
