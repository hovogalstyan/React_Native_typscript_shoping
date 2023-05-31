import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import SearchIcon from "../../assets/SerachIcon.svg";

interface PropsTypes {
  onPress: () => void;
}

const MenuPageSearch: FC<PropsTypes> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{
      width: "100%",
      paddingVertical: 10,
      backgroundColor: "rgba(0,0,0,0.2)",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 30,
      paddingHorizontal: 22
    }}>
      <SearchIcon width={"30"} fill={"#000"} height={"30"} />
      <Text style={{
        color: "black",
        fontSize: 15,
        marginLeft: 16
      }}>Search...</Text>
    </TouchableOpacity>
  );
};

export default MenuPageSearch;
