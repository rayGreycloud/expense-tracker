export const isLast7Days = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - inputDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

export const getFormattedDate = (date) => date.toISOString().slice(0, 10);
