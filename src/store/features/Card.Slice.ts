import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cardInitialStateTypes, ProductItemTypes } from "../../type/types";

const initialState: cardInitialStateTypes = {
  cardList: [],
  juicesList: []
};

const CardSLice = createSlice({
  name: "card/list",
  initialState,
  reducers: {
    addToCard: (state, action: PayloadAction<ProductItemTypes>) => {
      const index = state.cardList.find((item: ProductItemTypes) => item.id === action.payload.id);
      if (index) {
        index.quantity += 1;
      } else {
        state.cardList = [action.payload, ...state.cardList];
      }
    },
    deleteItemsCard: (state, action: PayloadAction<number>) => {
      const index = state.cardList.findIndex((item: ProductItemTypes) => item.id === action.payload);
      state.cardList.splice(index, 1);
    },
    decreasedQuantityCard: (state, action: PayloadAction<number>) => {
      const index = state.cardList.findIndex((item: any) => item.id === action.payload);
      if (index != -1) {
        if (state.cardList[index].quantity > 1) {
          state.cardList[index].quantity--;
        }
      }
    },
    incrementQuantityCard: (state, action: PayloadAction<number>) => {
      const thisItems = state.cardList.find((item: any) => item.id === action.payload);
      if (thisItems) {
        thisItems.quantity++;
      }
    },
    addToCardJuices: (state, action: PayloadAction<any>) => {
      const index = state.juicesList.find((item: ProductItemTypes) => item.id === action.payload.id);
      if (index) {
        index.quantity += 1;
      } else {
        state.cardList = [action.payload, ...state.cardList];
      }
    }
  }
});

export default CardSLice.reducer;
export const { addToCard, deleteItemsCard, decreasedQuantityCard, incrementQuantityCard } = CardSLice.actions;
