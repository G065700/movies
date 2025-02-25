export function getYesterday() {
  const d = new Date();
  if (
    (d.getUTCHours() >= 15 && d.getUTCMinutes() >= 5) ||
    d.getUTCHours() > 15
  ) {
    d.setDate(d.getDate() - 1);
  }

  return (
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0')
  );
}

export function getLastSunday() {
  const d = new Date();
  const day = d.getDay();
  const dayOfTheWeek = day === 0 ? 7 : day;

  d.setDate(d.getDate() - dayOfTheWeek);

  return (
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0')
  );
}
