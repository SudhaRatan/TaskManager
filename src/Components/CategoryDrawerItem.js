import React from "react";
import { Drawer, useTheme } from "react-native-paper";
import { runOnJS } from "react-native-reanimated";

const CategoryDrawerItem = ({
  category,
  index,
  isActive,
  navigation,
  getTasks,
  setSelIndex,
  setCategory,
  // countTasks
}) => {
  const theme = useTheme();
  return (
    <Drawer.Item
      key={index}
      label={category.title}
      // right={() => (
      //   <Text style={{ color: theme.colors.secondary }}>{countTasks !== 0 && countTasks}</Text>
      // )}
      active={isActive(index)}
      onPress={() => {
        runOnJS(() => {
          setCategory(category);
          getTasks(category.id);
          setSelIndex(index);
        })();
        navigation.navigate("Category");
      }}
    />
  );
};

export default CategoryDrawerItem;
