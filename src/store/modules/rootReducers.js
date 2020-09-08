import { combineReducers } from "redux";

import { reducers as reducerAuth } from "./auth";
import { reducers as reducerEntity } from "./entity";

const rootReducers = combineReducers({
  auth: reducerAuth,
  entities: reducerEntity,
});

export default rootReducers;
