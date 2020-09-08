import { types } from "./types";

export const actions = {
  login: (data) => ({ type: types.AUTH_LOGIN, payload: data }),
  logout: () => ({ type: types.AUTH_LOGOUT }),
};
