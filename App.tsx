import React from "react";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./src/screen/TabNavigation/TabNavigation";
import SearchProductResult from "./src/screen/StackNavigation/SearchProductResult";
import Description from "./src/screen/StackNavigation/Description";

export type ScreenNames = ["TabNavigate", "SearchProductResult",'Description'] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;
const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"TabNavigate"}>
        <Stack.Screen
          name={"TabNavigate"}
          component={TabNavigation} />
        <Stack.Screen
          name={"SearchProductResult"}
          component={SearchProductResult} />
        <Stack.Screen
          name={"Description"}
          component={Description} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
