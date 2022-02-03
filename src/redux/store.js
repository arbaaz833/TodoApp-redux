import { createStore } from "redux";
import TodoReducer from "./reducer";

export const store = createStore(TodoReducer);
