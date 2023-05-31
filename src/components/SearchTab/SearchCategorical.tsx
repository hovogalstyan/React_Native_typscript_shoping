import React, { FC, useCallback } from "react";
import { CategoricalItemTypes, useAppSelector } from "../../type/types";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchProductData } from "../../store/features/Products.Slice";

interface itemsProps {
  item: CategoricalItemTypes,
}

interface navigateType {
  navigate: (value: string) => void;
}

const CategoricalItems: FC<itemsProps> = ({ item }): any => {
  const { navigate }: navigateType = useNavigation();
  const dispatch = useDispatch();
  const searchToSearchResultPage = useCallback((categorical: string) => {
    dispatch(searchProductData(categorical));
    navigate("SearchProductResult");
  }, []);
  return (
    item.categorical !== "All" &&
    <TouchableOpacity
      onPress={() => searchToSearchResultPage(item.categorical)}
      style={{
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: "blue",
        alignItems: "center",
        marginTop: 3,
        marginRight: 30
      }}>
      <Text style={{
        fontSize: 16,
        fontWeight: "500",
        color: "#ffff"
      }}>{item.name}</Text>
    </TouchableOpacity>
  );
};
const SearchCategorical: FC = () => {
  const categoricalState = useAppSelector(state => state.CategoricalSlice.categorical);
  return (
    <View style={{
      width: "100%",
      paddingVertical: 20
    }}>
      <Text style={{
        color: "blue",
        fontSize: 18,
        fontWeight: "700",
        borderBottomWidth: 1,
        borderColor: "blue",
        marginVertical: 17,
        paddingBottom: 5
      }}>Categorical</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoricalState}
        renderItem={({ item }) => <CategoricalItems item={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default SearchCategorical;
