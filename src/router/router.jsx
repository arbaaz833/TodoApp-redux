import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebaseconfig";
import App from "../components/home/App";
import Signin from "../components/signin/signin";
import Signup from "../components/signup/signup";
import { store } from "../redux/store";
import ReactLoading from "react-loading";
import { Provider } from "react-redux";
import Error from "../components/error/error";

function RouterWrapper({ authState, children }) {
  let [isAuthed, setIsAuthed] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setIsAuthed(true);
      else setIsAuthed(false);
    });
  }, []);

  if (isAuthed === undefined)
    return <ReactLoading type="bars" height="100px" width="100px" />;

  switch (authState) {
    case "only-authenticated":
      console.log("authed", isAuthed);
      if (isAuthed) return children;
      else {
        navigate("signin");
        return null;
      }

    case "only-unauthenticated":
      console.log("in un auth");
      if (isAuthed) {
        navigate("/");
        return null;
      } else return children;
  }
}

export function Router() {
  return (
    <Provider store={store}>
      <Error />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouterWrapper authState="only-authenticated">
                <App />
              </RouterWrapper>
            }
          />
          <Route
            path="signin"
            element={
              <RouterWrapper authState="only-unauthenticated">
                <Signin />
              </RouterWrapper>
            }
          />
          <Route
            path="signup"
            element={
              <RouterWrapper authState="only-unauthenticated">
                <Signup />
              </RouterWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
