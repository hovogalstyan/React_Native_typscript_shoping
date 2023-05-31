import React, { FC, useCallback, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ProductItemTypes, useAppDispatch, useAppSelector } from "../../type/types";
import { AddIcon } from "../../assets";
import { filterProductThisCategorical } from "../../store/features/Products.Slice";
import { useNavigation } from "@react-navigation/native";
import { getItemProductDescription } from "../../store/features/Description.Slice";
import { addToCard } from "../../store/features/Card.Slice";

type navigateProps = {
  navigate: (value: string) => void
}
const ProductList: FC = () => {
  const state = useAppSelector(state => state.ProductsSlice);
  const { navigate }: navigateProps = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(filterProductThisCategorical());
  }, [state.categorical]);
  const addToDescriptionPage = useCallback((item: ProductItemTypes) => {
    navigate("Description");
    dispatch(getItemProductDescription(item));
  }, []);
  const addCardItems = useCallback((item:ProductItemTypes)=>{
    dispatch(addToCard(item))
    navigate('Card')
  },[])
  return (
    <View style={{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      paddingBottom: 25
    }}>
      {state.filterProduct &&
        state.filterProduct.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                width: "45%",
                paddingHorizontal: 8,
                paddingVertical: 8,
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 5,
                alignItems: "center",
                marginTop: 38
              }}>
              <TouchableOpacity onPress={() => addToDescriptionPage(item)}>
                <Image
                  style={{
                    width: 135,
                    height: 100,
                    resizeMode: "cover"
                  }}
                  source={item.img} />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: "700",
                  lineHeight: 35
                }}
              >{item.name}</Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  paddingTop: 10,
                  paddingBottom: 13
                }}>
                <Text
                  style={{
                    color: "blue",
                    fontSize: 16,
                    fontWeight: "500"
                  }}
                >{item.price} AM</Text>
                <TouchableOpacity  onPress={()=> addCardItems(item)}>
                  <AddIcon width={"27"} height={"27"} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      }
    </View>
  );
};

export default ProductList;
