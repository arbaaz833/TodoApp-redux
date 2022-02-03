export default function TodoReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case "TODO_CREATED": {
      const newState = { ...state, todos: [...state.todos, action.payload] };
      return newState;
    }
    case "TODO_DELETED":
      let prevTodos = state.todos;
      let updatedTodos = prevTodos.filter(
        (todo, index) => index !== action.payload
      );
      const newState = { ...state, todos: updatedTodos };
      return newState;
    default:
      return state;
  }
}
