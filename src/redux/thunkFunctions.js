import { db, auth } from "../backend/firebaseconfig";

import { createAsyncThunk } from "@reduxjs/toolkit";

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
      thunkApi.dispatch({ type: "ERROR", payload: error.message });
    }
  }
);

export const signinUser = createAsyncThunk(
  "userSignin",
  async (data, thunkApi) => {
    try {
      if (data.newUser)
        await auth.createUserWithEmailAndPassword(data.email, data.password);
      else await auth.signInWithEmailAndPassword(data.email, data.password);
      console.log("signIn success");
    } catch (error) {
      console.log("error", error);
      thunkApi.dispatch({ type: "ERROR", payload: error.message.toString() });
    }
  }
);

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
      thunkApi.dispatch({ type: "ERROR", payload: error.message });
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
      thunkApi.dispatch({ type: "ERROR", payload: error.message });
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
      thunkApi.dispatch({ type: "ERROR", payload: error.message });
    }
  }
);
