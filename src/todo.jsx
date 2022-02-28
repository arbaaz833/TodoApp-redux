import React from "react";
// import { deleteTodo, updateTodo } from "./redux/action";
import styles from "../src/components/home/app.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateTodo, deleteTodo } from "./redux/thunkFunctions";

export default function Todo({ todo, index, id }) {
  let [updatedValue, setValue] = useState("");
  let [updating, setUpdating] = useState(false);
  let dispatch = useDispatch();
  //new comment
  function updateValue(e) {
    setValue(e.target.value);
  }
  return (
    <div
      key={index.toString()}
      className={styles.todo}
      style={
        todo.completed ? { backgroundColor: "rgba(79, 223, 79, 0.4)" } : {}
      }
    >
      <p
        style={
          todo.completed
            ? {
                textDecoration: "line-through",
                overflowWrap: "break-word",
                width: "40%",
                textAlign: "left",
              }
            : { overflowWrap: "break-word", width: "40%", textAlign: "left" }
        }
      >
        {todo.name}
      </p>
      {!updating ? (
        <div>
          <button
            className={styles.button}
            onClick={() => {
              dispatch(
                updateTodo({
                  data: { completed: !todo.completed },
                  id: id,
                  index: index,
                })
              );
            }}
          >
            {todo.completed ? "mark incomplete" : "mark complete"}
          </button>
          <button
            className={styles.button}
            onClick={() => dispatch(deleteTodo({ id: id, index: index }))}
          >
            Delete
          </button>
          <button className={styles.button} onClick={() => setUpdating(true)}>
            update
          </button>
        </div>
      ) : (
        <div>
          <input
            style={{
              padding: "6px",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Enter New Title"
            value={updatedValue}
            onChange={(e) => {
              updateValue(e);
            }}
          />
          <button
            className={styles.button}
            onClick={() => {
              dispatch(
                updateTodo({
                  data: { name: updatedValue },
                  id: id,
                  index: index,
                })
              );
              setUpdating(false);
              setValue("");
            }}
          >
            update
          </button>
        </div>
      )}
    </div>
  );
}
