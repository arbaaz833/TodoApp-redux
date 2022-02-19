import React, { useState } from "react";
import styles from "../signin/signin.module.css";
// import { auth } from "../../backend/firebaseconfig";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { signinUser } from "../../redux/thunkFunctions";
import { useDispatch } from "react-redux";

export default function Signup() {
  let dispatch = useDispatch();
  let [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);
  let [password, setPassword] = useState("");

  function handleEChange(e) {
    let value = e.target.value;
    setEmail(value);
  }

  function handlePChange(e) {
    let value = e.target.value;
    setPassword(value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(signinUser({ newUser: true, email, password }));
      }}
      className={styles.authForm}
    >
      <h2>Sign Up</h2>
      <hr />

      <h3>Email</h3>
      <input
        type="email"
        required={true}
        value={email}
        onChange={handleEChange}
      />

      <h3>Password</h3>
      <input
        required={true}
        id="userPassword"
        type="password"
        value={password}
        onChange={handlePChange}
      />
      <br />
      <button className={styles.btn} type="submit">
        Sign Up
      </button>
      <Link to="/signin">Already Have An Account? SignIn.</Link>
    </form>
  );
}
