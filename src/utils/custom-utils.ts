export function generateDays(duration: number): string[] {
  return Array.from({ length: duration }, (_, index) => `Day ${index + 1}`);
}
