import React, { FC, useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { navigateTypes, ProductItemTypes, useAppDispatch, useAppSelector } from "../../type/types";
import LinearGradient from "react-native-linear-gradient";
import { promotionsFilterItems } from "../../store/features/Products.Slice";
import { getItemProductDescription } from "../../store/features/Description.Slice";
import { useNavigation } from "@react-navigation/native";

const PromotionsItems: FC = () => {
  const { navigate }: navigateTypes = useNavigation();
  const state: any = useAppSelector(state => state.ProductsSlice.promotions);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(promotionsFilterItems("All"));
  }, []);
  const descriptionPages = useCallback((item: ProductItemTypes) => {
    dispatch(getItemProductDescription(item));
    navigate("Description");
  }, []);
  return (
    state &&
    <TouchableOpacity
      activeOpacity={0.8}
      onPressOut={() => descriptionPages(state)}
      style={{
        width: "100%"
      }}>
      <Text style={{
        color: "#000",
        fontSize: 16,
        fontWeight: "500",
        borderBottomWidth: 2,
        borderColor: "blue",
        paddingBottom: 8,
        position: "relative"
      }}>Promotions</Text>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.2 }}
        colors={["#7150DB", "rgba(147, 132, 176, 0.62)"]}
        style={{
          width: "100%",
          paddingBottom: 40,
          paddingHorizontal: 12,
          marginVertical: 25,
          borderRadius: 15
        }}>
        <View style={{
          width: "70%"
        }}>
          <Text style={styles.text}>Today’s Offer</Text>
          <Text style={[styles.text, {
            color: "red"
          }]}>{state.name}</Text>
          <Text style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: "500",
            maxWidth: 200
          }}>{state.description}</Text>
        </View>
        <Image source={state.img} style={{
          width: 130,
          height: 80,
          position: "absolute",
          top: -15,
          right: 0,
          borderRadius: 20
        }} />
      </LinearGradient>
    </TouchableOpacity>

  )
    ;
};

export default PromotionsItems;
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 28
  }
});
