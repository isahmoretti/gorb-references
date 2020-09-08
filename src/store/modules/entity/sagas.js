import { call, put } from "redux-saga/effects";

// service
import api from "../../../service/api";

// types
import { types } from "./types";

function* load() {
  try {
    const response = yield call(api.get, "/forms");

    yield put({ type: types.ENTITY_LOAD_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.ENTITY_LOAD_FAILURE });
  }
}

function* show(action) {
  const { payload } = action;

  try {
    const response = yield call(api.get, `/forms/${payload}`);

    yield put({ type: types.ENTITY_SHOW_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.ENTITY_SHOW_FAILURE });
  }
}

function* createText(action) {
  const { payload } = action;

  try {
    const response = yield call(api.post, "/texts", payload);

    yield put({
      type: types.ENTITY_CREATE_TEXT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: types.ENTITY_CREATE_TEXT_FAILURE });
  }
}

export default { load, show, createText };
