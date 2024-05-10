import { withObservables } from "@nozbe/watermelondb/react";
import { useDatabaseStore } from "../Stores/databaseStore";
import { Drawer, Menu } from "react-native-paper";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useCategoryStore } from "../Stores/categoryStore";
import { useTaskStore } from "../Stores/taskStore";
import { getTasksForCategory } from "../DL/TasksDL";
import { runOnJS } from "react-native-reanimated";

const database = useDatabaseStore.getState().database;

function Categories({ categories, navigation, state }) {
  const [selIndex, setSelIndex] = useState(0);
  const setCategory = useCategoryStore((state) => state.setCategory);
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
    if (categories.length > 0) getTasks(categories[0].id);
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
              navigation.navigate("Category");
              runOnJS(() => {
                getTasks(category.id);
                setSelIndex(index);
                setCategory(category);
              })();
            }}
          />
        );
      })}
    </>
  );
}

function CategoriesDropdown({ categories, closeMenu }) {
  const setCategory = useCategoryStore((state) => state.setCategory);
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
