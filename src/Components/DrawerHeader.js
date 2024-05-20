import React from "react";
import { Appbar } from "react-native-paper";
import { useCategoryStore } from "../Stores/categoryStore";
import CategoryHeaderOptions from "./CategoryHeaderOptions";

const DrawerHeader = ({ navigation, route }) => {
  const category = useCategoryStore((state) => state.category);
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.toggleDrawer()}
      />
      <Appbar.Content
      titleStyle={{fontSize:20}}
        title={
          route.name === "Category"
            ? category?.title && category.title
            : route.name
        }
      />

      {route.name === "Category" && <CategoryHeaderOptions />}
    </Appbar.Header>
  );
};

export default DrawerHeader;
