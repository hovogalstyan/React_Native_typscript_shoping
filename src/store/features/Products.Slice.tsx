import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInitialStateTypes, ProductItemTypes } from "../../type/types";
import { Product } from "../Product";
import { shuffleArray } from "../../CustomerFunction";

const initialState: ProductInitialStateTypes = {
  products: Product,
  promotions: null,
  filterProduct: [],
  categorical: "All",
  searchResult: null
};
const ProductsSlice = createSlice({
  name: "product/data",
  initialState,
  reducers: {
    promotionsFilterItems: (state, action: PayloadAction<string>) => {
      if (state.categorical === "All") {
        const result = state.products.filter((item: ProductItemTypes) => item.price <= 1000);
        state.promotions = result[Math.floor(Math.random() * result.length)];
      } else {
        const filterDataCategorical = state.products.filter((item: ProductItemTypes) => item.categorical === action.payload);
        const result = filterDataCategorical.filter((item: ProductItemTypes) => item.price <= 1000);
        const shuffleData = shuffleArray(result)
        state.promotions = shuffleData[Math.floor(Math.random() * shuffleData.length)];
      }

    },
    editCategorical: (state, action: PayloadAction<string>) => {
      state.categorical = action.payload;
    },
    filterProductThisCategorical: (state) => {
      if (state.categorical === "All") {
        state.filterProduct = state.products;
      } else {
       const result = state.products.filter((item: ProductItemTypes) => item.categorical === state.categorical);
       state.filterProduct = shuffleArray(result)
      }
    },
    searchProductData: (state, action: PayloadAction<string>) => {
    const result = state.products.filter((item: ProductItemTypes) => {
        if (item.name.toLowerCase().includes(action.payload.toLowerCase())
          || item.categorical.toLowerCase().includes(action.payload.toLowerCase())) {
          return item;
        }
      });
      state.searchResult = shuffleArray(result)
    }
  }
});

export default ProductsSlice.reducer;
export const {
  promotionsFilterItems,
  filterProductThisCategorical,
  editCategorical,
  searchProductData
} = ProductsSlice.actions;
