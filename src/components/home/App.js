// import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeVisibility } from "../../redux/action";
import styles from "./app.module.css";
import { auth } from "../../backend/firebaseconfig";
import Todo from "../../todo.jsx";
import { createTodo, fetchTodos } from "../../redux/thunkFunctions";
import ReactLoading from "react-loading";

function App() {
  const dispatch = useDispatch();
  const currState = useSelector((state) => state);
  const todos = currState.todos;
  const update = currState.updatingTodo;
  const del = currState.deletingTodo;
  const create = currState.creatingTodo;
  const fetch = currState.fetchingTodos;

  const visibility = currState.visibility;
  const [ip, setIp] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  let currTodosSet = todos.filter((todo) => {
    if (visibility === "all") return true;
    else if (visibility === "completed") {
      if (todo.completed) return true;
    } else if (visibility === "incomplete") {
      if (!todo.completed) return true;
    }
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.headingCon}>
        <div className={styles.logout}>
          <button
            onClick={() => {
              auth.signOut();
            }}
            className={styles.button}
          >
            Logout
          </button>
        </div>
        <h1>TODO APP</h1>
        <div>
          <input
            className={styles.input}
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            type="text"
          />
          <button
            className={styles.button}
            onClick={() => {
              if (ip !== "") dispatch(createTodo(ip));
              setIp("");
            }}
          >
            Create Todo
          </button>
        </div>
        <nav className={styles.nav}>
          <div
            style={visibility == "all" ? { color: "black" } : {}}
            onClick={() => {
              dispatch(changeVisibility("all"));
            }}
          >
            All
          </div>
          <div
            style={visibility == "completed" ? { color: "black" } : {}}
            onClick={() => {
              dispatch(changeVisibility("completed"));
            }}
          >
            completed
          </div>
          <div
            style={visibility == "incomplete" ? { color: "black" } : {}}
            onClick={() => {
              dispatch(changeVisibility("incomplete"));
            }}
          >
            incomplete
          </div>
        </nav>
      </div>

      <div className={styles.todosCon}>
        {/* {todos.filter((todo, index) => {
          if (visibility === "all") {
            return <Todo todo={todo} index={index} />;
          } else if (visibility === "completed") {
            if (todo.completed) return <Todo todo={todo} index={index} />;
          } else if (visibility === "incomplete") {
            if (!todo.completed) return <Todo todo={todo} index={index} />;
          }
        })} */}
        {update || del || create || fetch ? (
          <ReactLoading
            type="bars"
            height="100px"
            width="100px"
            color="black"
          />
        ) : currTodosSet.length === 0 ? (
          <h1>You Donot Have Any Todos Yet.</h1>
        ) : (
          currTodosSet.map((todo, index) => {
            return (
              <Todo key={todo.id} todo={todo} index={index} id={todo.id} />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
