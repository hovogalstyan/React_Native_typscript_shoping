import React, { FC, useCallback} from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import useTextInput from "../Hooks/useTextInput";
import { SearchIcon } from "../../assets";
import { useAppDispatch} from "../../type/types";
import { addNewTodos } from "../../store/features/SearchTodos.Slice";
import { searchProductData } from "../../store/features/Products.Slice";

interface PropsType {
  productResultPage: () => void;
}

const SearchToTodoInput: FC<PropsType> = ({ productResultPage }) => {
  const { defaultValue, onChangeText } = useTextInput();
  const dispatch = useAppDispatch();
  const addTodos = useCallback(() => {
    if (defaultValue !== "" ) {
      setTimeout(() => {
        dispatch(addNewTodos(defaultValue));
      }, 2000);
      onChangeText("");
      dispatch(searchProductData(defaultValue));
      productResultPage();
    }
  }, [defaultValue]);
  return (
    <View style={{
      paddingVertical:15,
      paddingHorizontal:15
    }}>
    <View style={{
      width: "100%",
      paddingVertical: 1,
      backgroundColor: "rgba(0,0,0,0.8)",
      flexDirection: "row",
      borderRadius:5,
      alignItems: "center"
    }}>
      <TextInput
        style={{
          width: "85%",
          color: "#fff",
          fontSize: 16,
          fontWeight: "500",
          paddingHorizontal: 20
        }}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholderTextColor={"#fff"}
        placeholder={"Search..."}
      />
      <TouchableOpacity onPress={addTodos}>
        <SearchIcon width={"30"} height={"30"} fill={"#fff"} />
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default SearchToTodoInput;
