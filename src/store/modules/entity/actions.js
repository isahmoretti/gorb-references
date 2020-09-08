import { types } from "./types";

export const actions = {
  load: () => ({ type: types.ENTITY_LOAD }),
  show: (id) => ({ type: types.ENTITY_SHOW, payload: id }),
  createText: (data) => ({ type: types.ENTITY_CREATE_TEXT, payload: data }),
};
