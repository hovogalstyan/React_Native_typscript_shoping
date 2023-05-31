import React, { FC, useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SearchToTodoInput from "../../components/SearchTab/SearchToTodoInput";
import SearchTodoToCategoricalSlice from "../../components/SearchTab/SearchTodoToCategoricalSlice";

interface PropsType {
  navigation: {
    navigate: (value: string) => void
  };
}

const Search: FC<PropsType> = ({ navigation }) => {
  const productResultPage = useCallback(() => {
    navigation.navigate("SearchProductResult");
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <SearchToTodoInput productResultPage={productResultPage} />
      <SearchTodoToCategoricalSlice />
    </SafeAreaView>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(0,0,255)"
  }
});
