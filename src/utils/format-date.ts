import moment from "moment";

export const formatMonth = (date: string | undefined) => {
  const month = moment(date).format("MMM");
  return month;
};

export const formatFullDate = (date: string | undefined) => {
  const fullDate = moment(date).locale("id").format("D MMMM YYYY");
  return fullDate;
};
