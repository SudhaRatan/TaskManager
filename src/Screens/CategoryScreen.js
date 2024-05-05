import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FAB, useTheme, Text } from "react-native-paper";
import AddTask from "../Components/AddTask";
import { useCategoryStore } from "../Stores/categoryStore";
import { withObservables } from "@nozbe/watermelondb/react";
import { useDatabaseStore } from "../Stores/databaseStore";
import { Q } from "@nozbe/watermelondb";
import CategoryTask from "../Components/CategoryTask";

const CategoryScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const theme = useTheme();
  const styles = style(theme);

  const category = useCategoryStore((state) => state.category);
  const database = useDatabaseStore((state) => state.database);

  const CategoryTasks = ({ tasks }) => {
    return (
      <View style={{ gap: 10, padding: 10 }}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => {
            return <CategoryTask task={task} index={index} key={index} />;
          })
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text variant="headlineLarge">No tasks</Text>
          </View>
        )}
      </View>
    );
  };

  const enhance =
    category &&
    withObservables([""], () => ({
      tasks: database.collections
        .get("tasks")
        .query(Q.where("category_id", category.id))
        .observe(),
    }));

  const EnhancedTasks = category
    ? enhance(CategoryTasks)
    : function () {
        return (
          <View>
            <Text>Loading tasks</Text>
          </View>
        );
      };

  return (
    <View style={styles.CategoryCont}>
      <View>
        <EnhancedTasks />
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
