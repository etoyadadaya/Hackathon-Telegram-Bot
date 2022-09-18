export const getDataString = (data: Date) => {
  let minutes = `${new Date(data).getMinutes()}`;

  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }

  return `${new Date(data).toDateString()} ${new Date(data).getHours()}:${minutes}`
}