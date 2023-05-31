import React, { FC, useCallback } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { navigateTypes, ProductItemTypes, useAppDispatch, useAppSelector } from "../../type/types";
import { getItemProductDescription } from "../../store/features/Description.Slice";
import { useNavigation } from "@react-navigation/native";
import { AddIcon } from "../../assets";
import { addToCard } from "../../store/features/Card.Slice";

interface ItemProps {
  item: ProductItemTypes;
}

const ProductItems: FC<ItemProps> = ({ item }) => {
  const { navigate }: navigateTypes = useNavigation();
  const dispatch = useAppDispatch();
  const descriptionPages = useCallback((item: ProductItemTypes) => {
    dispatch(getItemProductDescription(item));
    navigate("Description");
  }, []);
  const addToCardPages = useCallback((item: ProductItemTypes) => {
    navigate("Card");
    dispatch(addToCard(item));
  }, []);
  return <View
    style={{
      width: "100%",
      marginTop: 12,
      shadowColor: "#970c0c",
      flexDirection: "row",
      justifyContent: "space-between",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity:
        0.25,
      shadowRadius:
        3.84,
      elevation: 5,
      backgroundColor: "white",
      position: "relative"
    }}>
    <TouchableOpacity onPressOut={() => descriptionPages(item)}>
      <Image
        source={item.img}
        style={{
          width: 145,
          height: 110,
          resizeMode: "cover"
        }} />
    </TouchableOpacity>
    <View style={{
      width: "70%",
      paddingVertical: 25,
      paddingHorizontal: 25,
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center"
    }}>
      <Text
        style={{
          color: "#000",
          fontSize: 17,
          fontWeight: "700"
        }}>{item.name.substring(0, 10)}...</Text>
      <Text style={{
        color: "blue",
        marginLeft: 10,
        fontWeight: "700",
        fontSize: 18
      }}>{item.price} AMD</Text>
    </View>
    <TouchableOpacity
      onPress={() => addToCardPages(item)}
      style={{
        position: "absolute",
        right: 7,
        bottom: 7
      }}>
      <AddIcon width={"35"} height={"35"} fill={"red"} />
    </TouchableOpacity>
  </View>;
};
const SearchProductResult: FC = () => {
  const state = useAppSelector(state => state.ProductsSlice.searchResult);
  return (
    <SafeAreaView style={{
      width: "100%",
      paddingHorizontal: 6,
      paddingVertical: 5
    }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={state}
        renderItem={({ item }) => <ProductItems item={item} />} />
    </SafeAreaView>
  );
};

export default SearchProductResult;
