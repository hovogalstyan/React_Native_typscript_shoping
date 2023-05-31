import { SearchInitialSTateTodosTypes, TodoItemTypes } from "../../type/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchInitialSTateTodosTypes = {
  todosList: []
};
const SearchTodoSLice = createSlice({
  name: "search/todo",
  initialState,
  reducers: {
    addNewTodos: (state, action: PayloadAction<string>) => {
      const newTodo = state.todosList.find((todo: TodoItemTypes) => todo.text === action.payload);
      if (!newTodo) {
        const todos = {
          id: Math.floor(Math.random() * 15624),
          text: action.payload
        };
        state.todosList.push(todos);
      }
    },
    deleteTodos: (state, action: PayloadAction<number>) => {
      const index = state.todosList.findIndex((todo: TodoItemTypes) => todo.id === action.payload);
      state.todosList.splice(index, 1);
    }
  }
});

export default SearchTodoSLice.reducer;
export const { addNewTodos, deleteTodos } = SearchTodoSLice.actions;
