import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FAB, useTheme, Text } from "react-native-paper";
import AddTask from "../Components/AddTask";
import { useTaskStore } from "../Stores/taskStore";

const CategoryScreen = () => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const theme = useTheme();
  const styles = style(theme);

  const categoryTasks = useTaskStore((state) => state.categoryTasks);

  return (
    <View style={styles.CategoryCont}>
      <View>
        {categoryTasks.length > 0 ? (
          categoryTasks.map((item, index) => {
            return <Text key={index}>{item.title}</Text>;
          })
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text variant="headlineLarge">No tasks</Text>
          </View>
        )}
      </View>
      <FAB
        icon="plus"
        label="Add task"
        style={styles.fab}
        size="small"
        onPress={showDialog}
      />
      <AddTask hideDialog={hideDialog} visible={visible} />
    </View>
  );
};

const style = (props) =>
  StyleSheet.create({
    CategoryCont: {
      flex: 1,
      backgroundColor: props.colors.background,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

export default CategoryScreen;
