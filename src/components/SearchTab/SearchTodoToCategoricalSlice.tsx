import React, { FC, useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { TodoItemTypes, useAppDispatch, useAppSelector } from "../../type/types";
import { useNavigation } from "@react-navigation/native";
import { deleteTodos } from "../../store/features/SearchTodos.Slice";
import { searchProductData } from "../../store/features/Products.Slice";
import { DeleteIcon } from "../../assets";
import SearchCategorical from "./SearchCategorical";

interface PropsTypes {
  item: TodoItemTypes;
}

type navigationType = {
  navigate: (value: string) => void
}
const TodosItem: FC<PropsTypes> = ({ item }) => {
  const { navigate }: navigationType = useNavigation();
  const dispatch = useAppDispatch();
  const deleteTodosItem = useCallback((id: number) => {
    dispatch(deleteTodos(id));
  }, [item]);
  const searchGetTodoTextProduct = useCallback((text: string) => {
    dispatch(searchProductData(text));
    navigate("SearchProductResult");
  }, []);
  return (
    <TouchableOpacity
      onPress={() => searchGetTodoTextProduct(item.text)}
      activeOpacity={0.5}
      style={{
        paddingVertical: 5,
        paddingHorizontal: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 2,
        borderColor: "#000",
        borderBottomWidth: 1,
        paddingBottom: 5
      }}>
      <Text style={{
        color: "#000",
        fontSize: 16,
        fontWeight: "500",
        maxWidth: 220
      }}>{item?.text}</Text>
      <TouchableOpacity
        onPress={() => deleteTodosItem(item.id)}>
        <DeleteIcon width={"30"} height={"30"} fill={"red"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const SearchTodoToCategoricalSlice = () => {
  const todosState = useAppSelector(state => state.SearchTodosSlice.todosList);
  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "#fff",
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20
    }}>
      <View style={{
        width: "100%"
      }}>
        <FlatList
          data={todosState}
          renderItem={({ item }) => (<TodosItem item={item} />)}
          keyExtractor={item => item.text}
        />
      </View>
      <SearchCategorical />
    </View>
  );
};

export default SearchTodoToCategoricalSlice;
