import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "../../models/error";

export default function Error() {
  let dispatch = useDispatch();
  let error = useSelector((state) => state.error.message);
  console.log("error from com", error);
  if (error) {
    setTimeout(() => {
      dispatch(clearError());
    }, 4000);
  }

  return (
    <>
      {error ? (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1111,
            textAlign: "left",
            width: "30vw",
            borderRadius: "10px",
            backgroundColor: "#ff3333",
            fontSize: "1rem",
            padding: "10px",
          }}
        >
          {error.toString()}
        </div>
      ) : null}
    </>
  );
}
