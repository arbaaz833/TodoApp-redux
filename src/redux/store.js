import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducer";
import thunkMiddleware from "redux-thunk";

const enhancer = applyMiddleware(thunkMiddleware);
export const store = createStore(rootReducer, enhancer);
