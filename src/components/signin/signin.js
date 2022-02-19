import { react, useState } from "react";
// import { SignInUser } from "../../backend/user";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
// import { OfflineModal } from "../../components/offline/index";
import styles from "./signin.module.css";
import { signinUser } from "../../redux/thunkFunctions";
import { useDispatch } from "react-redux";

export default function Signin() {
  let dispatch = useDispatch();
  let [email, setEmail] = useState("");
  let [online, setOnline] = useState(true);
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

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
        dispatch(signinUser({ email, password }));
      }}
      className={styles.authForm}
    >
      <h2>Sign In</h2>
      <hr />
      <h3>Email</h3>
      <input type="email" value={email} onChange={handleEChange} />

      <h3>Password</h3>
      <input
        id="userPassword"
        type="password"
        value={password}
        onChange={handlePChange}
      />
      <br />
      <button className={styles.btn} type={loading ? null : "submit"}>
        {loading ? (
          <ReactLoading
            style={{ margin: "auto", height: "24px", width: "24px" }}
            type="spin"
            color="#000000"
          />
        ) : (
          <div>Sign In</div>
        )}
      </button>

      {loading ? null : <Link to="/signup">Create an Account</Link>}
    </form>
  );
}
