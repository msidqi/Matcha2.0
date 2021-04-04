export const formatDate = (date: string | Date) => {
  let toformat = date;
  if (typeof toformat === "string") {
    toformat = new Date(toformat);
  }
  const day = toformat.getDay();

  if (isNaN(day)) return null;
  return `${toformat.getDate()} ${toformat.toLocaleString("default", {
    month: "short",
  })}`;
};

export const isValidDate = (date: Date) =>
  date instanceof Date && !isNaN(date.getTime());
