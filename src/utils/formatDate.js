import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (d) => {
  const date = new Date(d);

  const response = format(date, "d MMM. yyyy", {
    locale: ptBR,
  });

  return response;
};
