import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FAB } from "react-native-paper";
import AddTask from "../Components/AddTask";

const CategoryScreen = () => {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);
  return (
    <View style={style.CategoryCont}>
      <Text>CategoryScreen</Text>
      <FAB
        icon={"arrow-right"}
        label="Add task"
        style={style.fab}
        size="small"
        onPress={showDialog}
      />
      <AddTask hideDialog={hideDialog} visible={visible} />
    </View>
  );
};

const style = StyleSheet.create({
  CategoryCont: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CategoryScreen;
