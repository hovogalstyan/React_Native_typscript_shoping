import React, { FC, useCallback, useState } from "react";
import { CategoricalItemTypes, useAppDispatch, useAppSelector } from "../../type/types";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { editCategorical, promotionsFilterItems } from "../../store/features/Products.Slice";

interface propsItems {
  item: CategoricalItemTypes,
  index: number,
  activeItemsStyles: (value: number, val: string) => void
  activeIndex: number
}

const CategoricalItem: FC<propsItems> =
  ({
     item
     , index
     , activeItemsStyles
     , activeIndex
   }) => {
    return (
      <View
        style={{
          paddingVertical: 3,
          marginRight: 12
        }}
        key={index}>
        <TouchableOpacity
          onPress={() => activeItemsStyles(index, item.categorical)}
          activeOpacity={0.8}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            backgroundColor: index === activeIndex ? "blue" : "rgba(0,0,0,0.1)",
            borderRadius: 25
          }}
        >
          <Image source={item.img} style={{
            width: 67,
            height: 60,
            resizeMode: "cover"
          }} />
        </TouchableOpacity>
        <Text style={{
          color: index === activeIndex ? "black" : "blue",
          fontSize: 17,
          fontWeight: "400",
          textAlign: "center",
          marginTop: 10
        }}>
          {item.name}
        </Text>
      </View>
    );
  };
const CategoricalList: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useAppDispatch();
  const activeItemsStyles = useCallback((index: number, categorical: string) => {
    dispatch(editCategorical(categorical));
    dispatch(promotionsFilterItems(categorical));
    setActiveIndex(index);
  }, [activeIndex]);
  const categoricalState = useAppSelector(state => state.CategoricalSlice.categorical);
  return (
    <View style={{
      width: "100%",
      paddingVertical: 25
    }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoricalState}
        renderItem={({ item, index }) => (
          <CategoricalItem
            item={item}
            index={index}
            activeItemsStyles={activeItemsStyles}
            activeIndex={activeIndex}
          />
        )} />
    </View>
  );
};

export default CategoricalList;

