import { createSlice } from "@reduxjs/toolkit";
import { CategoricalInitialStateTypes, CategoricalItemTypes } from "../../type/types";


const data: CategoricalItemTypes [] = [
  { categorical: "All", name: "All", img: require("../../assets/Categoris/All.png") },
  { categorical: "Burger", name: "Burger", img: require("../../assets/Categoris/Burger.png") },
  { categorical: "Pizza", name: "Pizza", img: require("../../assets/Categoris/Pizza.png") },
  { categorical: "Dessert", name: "Dessert", img: require("../../assets/Categoris/Dessert.png") }
];
const initialState: CategoricalInitialStateTypes = {
  categorical: data
};

const CategoricalSlice = createSlice({
  name: "Categorical",
  initialState,
  reducers: {}
});

export default CategoricalSlice.reducer;

export const {} = CategoricalSlice.actions;
