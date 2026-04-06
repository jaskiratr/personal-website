export function getReadingTime(body: string): number {
  const words = body.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
