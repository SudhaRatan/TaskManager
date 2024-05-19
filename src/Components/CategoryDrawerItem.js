import { View, Text } from "react-native";
import React from "react";
import { Drawer, useTheme } from "react-native-paper";
import { runOnJS } from "react-native-reanimated";
import { withObservables } from "@nozbe/watermelondb/react";

const CategoryDrawerItem = ({
  category,
  index,
  isActive,
  navigation,
  getTasks,
  setSelIndex,
  setCategory,
  countTasks
}) => {
  const theme = useTheme();
  return (
    <Drawer.Item
      key={index}
      label={category.title}
      right={() => (
        <Text style={{ color: theme.colors.secondary }}>{countTasks !== 0 && countTasks}</Text>
      )}
      active={isActive(index)}
      onPress={() => {
        navigation.navigate("Category");
        runOnJS(() => {
          getTasks(category.id);
          setSelIndex(index);
          setCategory(category);
        })();
      }}
    />
  );
};

const enhance = withObservables(['category'],({category}) => ({
    countTasks:category.tasks.observeCount(),
    category
}))

export default enhance(CategoryDrawerItem);
