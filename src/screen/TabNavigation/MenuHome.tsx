import React, { FC } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import MenuPageSearch from "../../components/MenuHomeTab/MenuPageSearch";
import CategoricalList from "../../components/MenuHomeTab/CategoricalList";
import PromotionsItems from "../../components/MenuHomeTab/PromotionsItems";
import ProductList from "../../components/MenuHomeTab/ProductList";
import { useAppSelector, CategoricalItemTypes } from "../../type/types";
import CustomerRenderComponentsHomeMenu from "../../components/MenuHomeTab/CustomerRenderComponentsHomeMenu";

interface PropsType {
  navigation: {
    navigate: (value: string) => void
  };
}

const MenuHome: FC<PropsType> = ({ navigation }) => {
  const categoricalState = useAppSelector(state => state.CategoricalSlice.categorical);
  const stateProducts = useAppSelector(state => state.ProductsSlice);

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: 35,
      paddingHorizontal: 25
    }}>
      <MenuPageSearch onPress={() => navigation.navigate("Search")} />
      <CategoricalList />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%"
        }}>
        <PromotionsItems />
        {
          stateProducts.categorical === "All" ?
            categoricalState.map((item: CategoricalItemTypes, index: number) => (
              item.categorical !== "All" &&
              <CustomerRenderComponentsHomeMenu key={index} categorical={item.categorical} product={stateProducts.products} />
            ))
            : <ProductList />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuHome;
