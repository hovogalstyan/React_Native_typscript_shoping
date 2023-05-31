import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MenuHome from "./MenuHome";
import Search from "./Search";
import Card from "./Card";
import User from "./User";
import TabNavigationButton from "../../components/TabNavigationButton";
import * as TabIcons from "../../assets/index";
import TabNavigationButtonCard from "../../components/TabNavigationButtonCard";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "black",
        paddingTop: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1,
        borderColor: "#fff",
        borderBottomWidth: 0
      }
    }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabNavigationButton isActive={focused} Icons={TabIcons.HomeIcon} />
          )
        }}
        name={"MenuHome"}
        component={MenuHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabNavigationButton isActive={focused} Icons={TabIcons.SearchIcon} />
          )
        }}
        name={"Search"}
        component={Search} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabNavigationButtonCard isActive={focused} />
          )
        }}
        name={"Card"}
        component={Card} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <TabNavigationButton isActive={focused} Icons={TabIcons.UserIcon} />
          )
        }}
        name={"User"}
        component={User} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
