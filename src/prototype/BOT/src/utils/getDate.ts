export const getAsDate = (day: Date, time: string) => {
  const date = day.toDateString() + " " + time;
  return new Date(date);
}