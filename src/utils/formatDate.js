import { format, addDays } from "date-fns";
import ptLocale from "date-fns/locale/pt";

export const formatDate = (d) => {
  const date = new Date(d);

  const temp = addDays(date, 1);

  const response = format(temp, "d MMM. yyyy", {
    locale: ptLocale,
  });

  return response;
};
