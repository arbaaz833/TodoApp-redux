import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../models/todos/index.js";
import errorReducer from "../models/error/index.js";

export const store = configureStore({
  reducer: {
    todoState: todoReducer,
    error: errorReducer,
  },
});
