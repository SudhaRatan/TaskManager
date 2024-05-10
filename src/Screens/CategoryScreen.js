import { View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { FAB, Text, useTheme } from "react-native-paper";
import AddTask from "../Components/AddTask";
import { useCategoryStore } from "../Stores/categoryStore";
import ConfirmDialog from "../Components/ConfirmDialog";
import { deleteTask } from "../DL/TasksDL";
import CategoryTasks, { EnhancedTasks } from "../Observables/EnhancedTasks";
import { useTaskStore } from "../Stores/taskStore";

const CategoryScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const theme = useTheme();
  const styles = style(theme);

  const categoryTasks = useTaskStore((state) => state.categoryTasks);
  const setCategoryTasks = useTaskStore((state) => state.setCategoryTasks);
  const category = useCategoryStore((state) => state.category);

  const DeleteRef = useRef();

  const ShowDeleteDialog = (task) => {
    DeleteRef.current.showDialog();
    DeleteRef.current.setParams(task);
  };

  const DeleteTask = (task) => {
    setCategoryTasks(categoryTasks.filter(t => task.id !== t.id))
  }

  return (
    <View style={styles.CategoryCont}>
      <View style={{ flex: 1 }}>
        {category ? (
          <CategoryTasks
            ShowDeleteDialog={ShowDeleteDialog}
            category={category}
            tasks={categoryTasks}
          />
        ) : (
          <Text>Loading</Text>
        )}
      </View>
      <FAB
        icon="plus"
        label="Add task"
        style={styles.fab}
        size="small"
        onPress={showDialog}
      />
      <AddTask categoryTasks={categoryTasks} hideDialog={hideDialog} visible={visible} />
      <ConfirmDialog
        ref={DeleteRef}
        text="Are you sure you want to delete this task?"
        okText="Delete"
        iconName="alert"
        action={(task) => {
          DeleteTask(task)
          deleteTask(task)
        }}
      />
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
