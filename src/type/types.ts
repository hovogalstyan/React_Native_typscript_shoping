import { AppDispatch, RootState } from "../store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { SVGProps } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface TodoItemTypes {
  id: number,
  text: string
}

export interface SearchInitialSTateTodosTypes {
  todosList: any,
}

export interface CategoricalInitialStateTypes {
  categorical: any;
}

export interface CategoricalItemTypes {
  categorical: string,
  img: any
  name: string
}

export interface ProductInitialStateTypes {
  products: any;
  promotions: null | object;
  categorical: string;
  filterProduct: ProductItemTypes [];
  searchResult: null | ProductItemTypes [];
}

export interface ProductItemTypes {
  id: number,
  categorical: string,
  name: string,
  img: any,
  description: string,
  quantity: number,
  price: number
}

export interface juicesItemsTypes {
  id: string,
  name: string,
  images: any,
  quantity: number,
  price: number
}

export interface DescriptionInitialStateTypes {
  productItem: ProductItemTypes | null;
  juicesList: juicesItemsTypes [];
}

export interface navigateTypes {
  navigate: (value: string) => void;
}

export interface cardInitialStateTypes {
  cardList: any;
  juicesList: any;
}
