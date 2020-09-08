import { all, takeLatest } from "redux-saga/effects";

import { types as typesAuth } from "./auth/types";
import { types as typesEntities } from "./entity/types";

import authSaga from "./auth/sagas";
import entitySaga from "./entity/sagas";

function* rootSagas() {
  yield all([
    // auth
    takeLatest(typesAuth.AUTH_LOGIN, authSaga.login),
    takeLatest(typesAuth.AUTH_LOGOUT, authSaga.logout),
    // entities
    takeLatest(typesEntities.ENTITY_LOAD, entitySaga.load),
    takeLatest(typesEntities.ENTITY_SHOW, entitySaga.show),
    takeLatest(typesEntities.ENTITY_CREATE_TEXT, entitySaga.createText),
  ]);
}

export default rootSagas;
