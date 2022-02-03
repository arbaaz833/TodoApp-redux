import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//create => {type:"TODO_CREATED", payload:""}
//delete => {type: "TODO_DELETED", payload: ""}

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [ip, setIp] = useState("");

  return (
    <div className="App">
      <input value={ip} onChange={(e) => setIp(e.target.value)} type="text" />
      <button onClick={() => dispatch({ type: "TODO_CREATED", payload: ip })}>
        Submit
      </button>

      {todos.map((todo, index) => (
        <div key={todo} style={{ display: "flex", alignItems: "center" }}>
          <p>{todo}</p>
          <button
            onClick={() => dispatch({ type: "TODO_DELETED", payload: index })}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

//{todos:[]}
export default App;
