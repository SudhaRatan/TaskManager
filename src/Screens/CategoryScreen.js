import { View, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { FAB, Menu, useTheme } from "react-native-paper";
import AddTask from "../Components/AddTask";
import { useCategoryStore } from "../Stores/categoryStore";
import ConfirmDialog from "../Components/ConfirmDialog";
import CategoryTasks from "../Observables/EnhancedTasks";
import { useTaskStore } from "../Stores/taskStore";
import AddCategory from "../Components/AddCategory";
import { useAuthStore } from "../Stores/authStore";
import { deleteCategory, deleteTask } from "../DL/firebaseFunctions";

const CategoryScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [categoryDialog, setCategoryDialog] = useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);
  const hideCategoryDialog = () => setCategoryDialog(false);
  const showCategoryDialog = () => setCategoryDialog(true);

  const theme = useTheme();
  const styles = style(theme);

  const categoryTasks = useTaskStore((state) => state.categoryTasks);
  const category = useCategoryStore((state) => state.category);
  const categoryMenu = useCategoryStore((state) => state.categoryMenu);
  const setCategoryMenu = useCategoryStore((state) => state.setCategoryMenu);
  const user = useAuthStore((state) => state.user);

  const DeleteRef = useRef();
  const DeleteCategoryRef = useRef();

  const ShowDeleteDialog = (task) => {
    DeleteRef.current.showDialog();
    DeleteRef.current.setParams(task);
  };

  const CategoryDeleteDialog = () => {
    setCategoryMenu(false);
    DeleteCategoryRef.current.showDialog();
  };

  return (
    <View style={styles.CategoryCont}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ height: 1, width: 1, flex: 1 }} />
        <Menu
          visible={categoryMenu}
          anchorPosition="top"
          onDismiss={() => setCategoryMenu(false)}
          anchor={<View style={{ width: 1, height: 1 }} />}
        >
          <Menu.Item
            leadingIcon="pencil"
            onPress={() => {
              setCategoryMenu(false);
              showCategoryDialog();
            }}
            title="Edit"
          />
          <Menu.Item
            leadingIcon="delete"
            onPress={CategoryDeleteDialog}
            title="Delete"
          />
        </Menu>
      </View>
      <View style={{ flex: 1 }}>
        <CategoryTasks
          ShowDeleteDialog={ShowDeleteDialog}
          tasks={categoryTasks}
          navigation={navigation}
        />
      </View>
      <View style={styles.fab}>
        <FAB
          icon="brain"
          onPress={() => navigation.navigate("AI")}
          variant="tertiary"
          size="small"
        />
        <FAB
          icon="plus"
          variant="tertiary"
          size="medium"
          onPress={showDialog}
        />
      </View>
      <AddTask user={user} hideDialog={hideDialog} visible={visible} />
      <ConfirmDialog
        ref={DeleteRef}
        text="Are you sure you want to delete this task?"
        okText="Delete"
        iconName="alert"
        action={(task) => {
          deleteTask({ taskId: task.id });
        }}
      />
      {categoryDialog && (
        <AddCategory
          user={user}
          category={category}
          update={true}
          visible={categoryDialog}
          hideDialog={hideCategoryDialog}
          closeMenu={() => setCategoryMenu(false)}
        />
      )}
      <ConfirmDialog
        ref={DeleteCategoryRef}
        iconName="alert"
        title="Are you sure ?"
        text="All tasks in this Category will be deleted"
        dismissText="No"
        okText="Yes"
        action={() => {
          deleteCategory({ categoryId: category.id });
          navigation.navigate("Home");
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
      alignItems:"center",
      gap:20
    },
  });

export default CategoryScreen;
