import { types } from "./types";

// selectors
import {
  createTreeAllId,
  createTreeById,
  insertElementAllId,
  insertElementById,
} from "../common/selectors";

const initialState = {
  byId: {},
  allId: [],
};

const reducerById = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case "persist/REHYDRATE": {
      if (action && action.payload) {
        return action.payload.entities.byId;
      }

      return initialState.byId;
    }
    case types.ENTITY_LOAD_SUCCESS:
      return createTreeById(payload);
    case types.ENTITY_SHOW_SUCCESS:
      return insertElementById(state, payload);
    default:
      return initialState.byId;
  }
};

const reducerAllId = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "persist/REHYDRATE": {
      if (action && action.payload && action.payload.entities) {
        return action.payload.entities.allId;
      }

      return initialState.allId;
    }
    case types.ENTITY_LOAD_SUCCESS:
      return createTreeAllId(payload);
    case types.ENTITY_SHOW_SUCCESS:
      return insertElementAllId(state, payload);
    default:
      return initialState.allId;
  }
};

export const reducers = (state = initialState, action) => ({
  byId: reducerById(state.byId, action),
  allId: reducerAllId(state.allId, action),
});
