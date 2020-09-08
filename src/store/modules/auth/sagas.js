import { call, put } from "redux-saga/effects";

// service
import api from "../../../service/api";

// types
import { types } from "./types";

function* login(action) {
  const { payload } = action;

  try {
    const response = yield call(api.post, "/auth", payload);

    yield put({ type: types.AUTH_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.AUTH_LOGIN_FAILURE });
  }
}

function* logout() {
  try {
    yield put({ type: types.AUTH_LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: types.AUTH_LOGOUT_FAILURE });
  }
}

export default { login, logout };
