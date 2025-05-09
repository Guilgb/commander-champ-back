export function formatColors(color: string) {
  const colors = color
    .replace(/[\{\}\"]/g, "")
    .split(",")
    .map((color) => color.toUpperCase());
  return colors;
}