import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SearchTodosSlice from "./features/SearchTodos.Slice";
import CategoricalSlice from "./features/Categorical.Slice";
import ProductsSlice from "./features/Products.Slice";
import CardSlice from "./features/Card.Slice";
import DescriptionSlice from "./features/Description.Slice";
const Root = combineReducers({
  SearchTodosSlice,
  CategoricalSlice,
  ProductsSlice,
  DescriptionSlice,
  CardSlice,
});

export const store = configureStore({ reducer: Root });
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
