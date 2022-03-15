import { auth } from "../backend/firebaseconfig";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const signinUser = createAsyncThunk(
  "userSignin",
  async (data, thunkApi) => {
    try {
      if (data.newUser)
        await auth.createUserWithEmailAndPassword(data.email, data.password);
      else await auth.signInWithEmailAndPassword(data.email, data.password);
      console.log("signIn success");
    } catch (error) {
      console.log("error", error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
