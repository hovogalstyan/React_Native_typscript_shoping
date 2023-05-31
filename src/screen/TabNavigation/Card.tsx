import React, { FC, useCallback } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../type/types";
import { ProductItemTypes } from "../../type/types";
import { CloseIcons, DecrementsIcons, IncrementsIcon } from "../../assets";
import { decreasedQuantityCard, deleteItemsCard, incrementQuantityCard } from "../../store/features/Card.Slice";

interface TotalProps {
  totals: number;
}

const TotalPrice: FC<TotalProps> = ({ totals }) => {

  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 25
    }}>
      <Text style={{
        color: "#000",
        fontSize: 18,
        fontWeight: "600"
      }}>Total:</Text>
      <Text style={{
        color: "#000",
        fontSize: 18,
        fontWeight: "800"
      }}>{totals} AMD</Text>
    </View>
  );
};
const JuicesList: FC = () => {
  return (
    <View style={{
      width: "100%",
      paddingVertical: 45,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity:
        0.25,
      shadowRadius:
        3.84,
      elevation: 5,
      backgroundColor: "white"
    }}>
    </View>
  );
};

interface RenderItemProps {
  item: ProductItemTypes;
}

const RenderItems: FC<RenderItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const deleteItems = useCallback((id: number) => {
    dispatch(deleteItemsCard(id));
  }, []);
  const decreasedQuantity = useCallback((id: number) => {
    dispatch(decreasedQuantityCard(id));
  }, []);
  const incrementQuantity = useCallback((id: number) => {
    dispatch(incrementQuantityCard(id));
  }, []);
  return (
    <View style={{
      width: "100%",
      paddingVertical: 30,
      flexDirection: "row"
    }}>
      <View style={{
        paddingVertical: 7,
        paddingHorizontal: 7,
        backgroundColor: "rgba(0,0,0,0.5)"
      }}>
        <Image source={item.img} style={{
          width: 120,
          height: 110,
          resizeMode: "cover"
        }} />
      </View>
      <View style={{
        paddingHorizontal: 10,
        paddingTop: 17
      }}>
        <Text style={{
          color: "#000",
          fontSize: 17,
          fontWeight: "700"
        }}>{item.name}</Text>
        <Text style={{
          color: "blue",
          fontWeight: "700",
          fontSize: 18,
          lineHeight: 35
        }}>{item.price * item.quantity} AMD</Text>
        <View style={{
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <TouchableOpacity onPress={() => decreasedQuantity(item.id)}>
            <DecrementsIcons width={"25"} height={"25"} fill={"#000"} />
          </TouchableOpacity>
          <Text style={{
            color: "#000",
            fontWeight: "600",
            fontSize: 20
          }}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
            <IncrementsIcon width={"25"} height={"25"} fill={"#000"} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => deleteItems(item.id)}
        style={{
          position: "absolute",
          top: 25,
          right: 0
        }}>
        <CloseIcons width={"30"} height={"30"} fill={"red"} />
      </TouchableOpacity>
    </View>
  );
};
const Card: FC = () => {
  const state = useAppSelector(state => state.CardSlice);
  let total = 0;
  return (
    <SafeAreaView style={{
      flex: 1,
      paddingHorizontal: 25,
      paddingVertical: 25,
      position: "relative"
    }}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Text style={{
          color: "#000",
          fontSize: 20,
          fontWeight: "700",
          textAlign: "left"
        }}>{state.cardList.length} Items in card</Text>
        {
          state.cardList &&
          state.cardList.map((item: ProductItemTypes) => {
            total += item.quantity * item.price;
            return (
              <RenderItems item={item} key={item.id} />
            );
          })
        }
        <Text style={{
          color: "#000",
          fontSize: 19,
          fontWeight: "500",
          lineHeight: 38
        }}>Juices:</Text>
        <JuicesList />
        <TotalPrice totals={total} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Card;
