import { types } from "./types";

const initialState = {
  token: "",
  user: {},
};

const reducerToken = (state = "", action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return initialState.token;
  }
};

const reducerUser = (state = "", action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return initialState.user;
  }
};

export const reducers = (state = initialState, action) => ({
  token: reducerToken(state.token, action),
  user: reducerUser(state, action),
});
