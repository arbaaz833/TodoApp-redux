import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, createTodo, deleteTodo, updateTodo } from "../todos";
import { signinUser } from "../../redux/thunkFunctions";
const initialState = { message: false };

const error = createSlice({
  name: "error",
  initialState,
  reducers: {
    clearError(state) {
      return false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { clearError } = error.actions;

export default error.reducer;
