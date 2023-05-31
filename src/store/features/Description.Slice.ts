import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DescriptionInitialStateTypes, ProductItemTypes } from "../../type/types";
import { JuicesData } from "../JuicesData";

const initialState: DescriptionInitialStateTypes = {
  productItem: null,
  juicesList:JuicesData
};

const DescriptionSlice = createSlice({
  name: "description/items",
  initialState,
  reducers: {
    getItemProductDescription: (state, action: PayloadAction<ProductItemTypes>) => {
      state.productItem = action.payload;
    },
    incrementItemQuantity: (state) => {
     if(state.productItem){
       state.productItem.quantity += 1
     }
    },
    decreasedItemQuantity:(state)=>{
     if (state.productItem){
       if(state.productItem.quantity > 1){
         state.productItem.quantity -= 1
       }
     }
    }
  }
});

export default DescriptionSlice.reducer;
export const { getItemProductDescription,decreasedItemQuantity,incrementItemQuantity } = DescriptionSlice.actions;
