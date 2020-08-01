import { format, addDays } from "date-fns";
import ptLocale from "date-fns/locale/pt";

export const formatDate = (d, f = "d MMM. yyyy") => {
  if(!d) return

  const date = new Date(d);

  const temp = addDays(date, 1);

  const response = format(temp, f, {
    locale: ptLocale,
  });

  return response;
};
