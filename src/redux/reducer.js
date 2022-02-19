//root reducer
export function rootReducer(
  state = {
    todos: [],
    visibility: "all",
    fetchTodos: false,
    updatingTodo: false,
    deletingTodo: false,
    creatingTodo: false,
    error: false,
  },
  action
) {
  return {
    todos: todoReducer(state.todos, action),
    visibility: visibilityReducer(state.visibility, action),
    fetchingTodos: action.type === "fetchTodos/pending" ? true : false,
    updatingTodo: action.type === "todoUpdate/pending" ? true : false,
    deletingTodo: action.type === "todoDelete/pending" ? true : false,
    creatingTodo: action.type === "todoCreate/pending" ? true : false,
    error: errorReducer(state.error, action),
  };
}

//sliceReducer

function errorReducer(Error, action) {
  switch (action.type) {
    case "ERROR": {
      console.log("in Error", action.payload);
      return action.payload;
    }
    default:
      return Error ? Error : false;
  }
}

function todoReducer(todoState, action) {
  switch (action.type) {
    case "fetchTodos/fulfilled": {
      console.log("loading todos in store");
      return [...action.payload];
    }
    case "todoCreate/fulfilled": {
      return [...todoState, action.payload];
    }
    case "todoDelete/fulfilled": {
      let updatedTodos = todoState.filter(
        (todo, index) => index !== action.payload.index
      );
      return updatedTodos;
    }
    case "todoUpdate/fulfilled": {
      console.log("updating");
      let updatedTodos = todoState.map((todo, index) => {
        if (index === action.payload.index) {
          console.log("new todo", { ...todo, ...action.payload.newData });
          return { ...todo, ...action.payload.newData };
        } else return todo;
      });
      return updatedTodos;
    }
    default:
      return todoState;
  }
}

function visibilityReducer(visibilityState, action) {
  switch (action.type) {
    case "CHANGE_VISIBILITY":
      return action.visibility;
    default:
      return visibilityState;
  }
}
