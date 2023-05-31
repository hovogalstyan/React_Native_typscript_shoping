import React, { FC } from "react";
import { Text, View } from "react-native";
import { CardIcon } from "../assets";
import { useAppSelector } from "../type/types";

interface CardProps {
  isActive: boolean;
}

const TabNavigationButtonCard: FC<CardProps> = ({ isActive }) => {
  const cardState = useAppSelector(state => state.CardSlice.cardList);
  return (
    <View style={{
      position: "relative"

    }}>
      <CardIcon width={"32"} height={"32"} fill={isActive ? "blue" : "#fff"} />
      {
        cardState.length !== 0 &&
        <View style={{
          position: "absolute",
          right: 3,
          top: -11,
          paddingHorizontal: 4,
          backgroundColor: "red",
          borderRadius: 50,
          zIndex: -1
        }}>
          <Text style={{
            color: "#fff"
          }}>{cardState.length}</Text>
        </View>
      }
    </View>
  );
};

export default TabNavigationButtonCard;

