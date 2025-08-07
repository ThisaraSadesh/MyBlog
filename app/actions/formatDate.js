// dateFormatter.js
export const formatDate = (date) => {
  const parsedDate = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(parsedDate);
};
