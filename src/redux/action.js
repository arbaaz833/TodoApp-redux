export const createTodo = (name, id) => {
  return {
    type: "TODO_CREATED",
    payload: { name, completed: false, id },
  };
};

export const deleteTodo = (index) => {
  return {
    type: "TODO_DELETED",
    payload: index,
  };
};

export const updateTodo = (newData, index) => {
  return {
    type: "TODO_UPDATE",
    payload: {
      newData,
      index: index,
    },
  };
};

export const changeVisibility = (opt) => {
  console.log("changing visibility");
  return {
    type: "CHANGE_VISIBILITY",
    visibility: opt,
  };
};
