import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../../backend/firebaseconfig";

const initialState = {
  todos: [],
  visibility: "all",
  status: "idle",
};

export const createTodo = createAsyncThunk(
  "todoCreate",
  async (data, thunkApi) => {
    try {
      let newTodoDoc = await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("todos")
        .add({ name: data, completed: false, timeStamp: Date.now() });
      return { name: data, completed: false, id: newTodoDoc.id };
    } catch (error) {
      console.log("error", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todoUpdate",
  async (data, thunkApi) => {
    try {
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("todos")
        .doc(data.id)
        .set(data.data, { merge: true });
      return { newData: data.data, index: data.index };
    } catch (error) {
      console.log("error", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todoDelete",
  async (data, thunkApi) => {
    try {
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("todos")
        .doc(data.id)
        .delete();
      return { index: data.index };
    } catch (error) {
      console.log("error", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchTodos = createAsyncThunk(
  "fetchTodos",
  async (data, thunkApi) => {
    try {
      console.log("running thunk");
      let todosData = await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("todos")
        .orderBy("timeStamp", "asc")
        .get();
      let todosArr = [];
      todosData.forEach((todo) => {
        todosArr.push({ id: todo.id, ...todo.data() });
      });
      return todosArr;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeVisibility(state, action) {
      state.visibility = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = "fulfilled";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo, index) => index !== action.payload.index
        );
        state.status = "fulfilled";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo, index) => {
          if (index === action.payload.index)
            return { ...todo, ...action.payload.newData };
          else return todo;
        });
        state.status = "fulfilled";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.status = "fulfilled";
      })
      .addCase(createTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

export const { changeVisibility } = todosSlice.actions;

export default todosSlice.reducer;
