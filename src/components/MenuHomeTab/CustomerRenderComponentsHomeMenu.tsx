import React, { FC, useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ProductItemTypes, useAppDispatch } from "../../type/types";
import { useNavigation } from "@react-navigation/native";
import { searchProductData } from "../../store/features/Products.Slice";
import { getItemProductDescription } from "../../store/features/Description.Slice";
import { shuffleArray } from "../../CustomerFunction";

interface PropsTypes {
  categorical: string,
  product: ProductItemTypes []
}

interface RenderItemsPropsTypes {
  item: ProductItemTypes;
}

interface navigateTypes {
  navigate: (value: string) => void;
}

const RenderItems: FC<RenderItemsPropsTypes> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { navigate }: navigateTypes = useNavigation();
  const addToDescriptionPage = useCallback((item: ProductItemTypes) => {
    navigate("Description");
    dispatch(getItemProductDescription(item));
  }, []);
  return (
    <View style={{
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "rgba(0,0,0,0.5)",
      marginTop: 5,
      borderRadius: 7
    }}>
      <TouchableOpacity onPress={() => addToDescriptionPage(item)}>
        <Image source={item.img} style={{
          width: 90,
          height: 80,
          resizeMode: "cover"
        }} />
      </TouchableOpacity>
      <Text style={{
        fontSize: 17,
        fontWeight: "700",
        color: "#fff",
        marginTop: 8,
        textAlign: "center"
      }}>{item.name}</Text>
    </View>
  );
};

interface navigateProps {
  navigate: (path: string) => void;
}

const CustomerRenderComponentsHomeMenu: FC<PropsTypes> = ({ categorical, product }) => {
  const dispatch = useAppDispatch();
  const { navigate }: navigateProps = useNavigation();
  const filterCategorical = useMemo(() => {
    return product.filter((item: ProductItemTypes) => item.categorical === categorical);
  }, [categorical, product]);
  const sliceFilterCategorical = useMemo(() => {
   const result =filterCategorical.slice(0, 6);
   return  shuffleArray(result)
  }, [filterCategorical]);
  const searchPages = (categoricalValue: string) => {
    navigate("SearchProductResult");
    dispatch(searchProductData(categoricalValue));
  };
  return (
    <View style={{
      width: "100%"
    }}>
      <Text style={{
        color: "#000",
        fontSize: 20,
        fontWeight: "800",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingBottom: 5
      }}>{categorical}</Text>
      <View style={{
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap"
      }}>
        {
          sliceFilterCategorical.map((item: ProductItemTypes) => (
            <RenderItems item={item} key={item.id} />
          ))
        }
        <View style={{
          width: "100%",
          alignItems: "flex-start",
          paddingHorizontal: 4,
          paddingVertical: 15
        }}>
          <Text onPress={() => searchPages(categorical)} style={{
            color: "blue",
            fontSize: 20,
            fontWeight: "900"
          }}>More...</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomerRenderComponentsHomeMenu;
