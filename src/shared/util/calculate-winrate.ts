export function calWinrate(wins, losses, draws): number {
  const games = (Number(wins) + Number(losses) + Number(draws));
  const cal = (Number(wins) / games)
  const res = Number((cal * 100).toFixed(2));
  return res;
}