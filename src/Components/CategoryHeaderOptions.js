import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Icon, Menu, TouchableRipple } from "react-native-paper";
import { useCategoryStore } from "../Stores/categoryStore";

const CategoryHeaderOptions = () => {

  const setCategoryMenu = useCategoryStore((state) => state.setCategoryMenu);

  return (
    <TouchableRipple
      borderless={false}
      style={style.iconContainer}
      onPress={() => setCategoryMenu(true)}
    >
        <Icon source="dots-vertical" size={24} />
    </TouchableRipple>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 12,
    height: "100%",
    justifyContent: "center",
  },
});

export default CategoryHeaderOptions;
