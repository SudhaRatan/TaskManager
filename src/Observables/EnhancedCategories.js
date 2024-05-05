import { withObservables } from "@nozbe/watermelondb/react";
import { useDatabaseStore } from "../Stores/databaseStore";
import { Drawer, IconButton, MD3Colors, Menu } from "react-native-paper";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useCategoryStore } from "../Stores/categoryStore";
import { useTaskStore } from "../Stores/taskStore";
import { getTasksForCategory } from "../DL/TasksDL";

const database = useDatabaseStore.getState().database;
const setCategory = useCategoryStore.getState().setCategory;

function Categories({ categories, navigation, state }) {
  const [selIndex, setSelIndex] = useState(0);
  const isActive = (index) => {
    if (state.index === 1 && selIndex === index) {
      return true;
    }
    return false;
  };

  const setCategoryTasks = useTaskStore((state) => state.setCategoryTasks);

  const getTasks = async (catId) => {
    const tasks = await getTasksForCategory(catId);
    setCategoryTasks(tasks);
  };

  useState(() => {
    getTasks(categories[0].id);
  }, []);
  return (
    <>
      {categories.map((category, index) => {
        return (
          <Drawer.Item
            key={index}
            label={category.title}
            active={isActive(index)}
            onPress={() => {
              getTasks(category.id);
              setSelIndex(index);
              setCategory(category);
              navigation.navigate("Category");
            }}
          />
        );
      })}
    </>
  );
}

function CategoriesDropdown({ categories, closeMenu }) {
  return (
    <ScrollView style={{ maxHeight: 300 }}>
      {categories.map((category, index) => {
        return (
          <Menu.Item
            key={category.id}
            onPress={() => {
              setCategory(category);
              closeMenu();
            }}
            style={style.menuItem}
            title={category.title}
          />
        );
      })}
    </ScrollView>
  );
}

const enhance = withObservables([""], () => ({
  categories: database.collections.get("categories").query().observe(),
}));

export const EnhancedCategories = enhance(Categories);
export const EnhancedCategoriesDropdown = enhance(CategoriesDropdown);

const style = StyleSheet.create({
  menuItem: { minWidth: "100%" },
  drawerItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
