import { ActivityIndicator, Menu, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useCategoryStore } from "../Stores/categoryStore";
import { useTaskStore } from "../Stores/taskStore";
import { runOnJS } from "react-native-reanimated";
import CategoryDrawerItem from "../Components/CategoryDrawerItem";
import { getTasks as getCategoryTasks } from "../DL/firebaseFunctions";

export function Categories({ categories, navigation, state, user }) {
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
    setCategoryTasks([]);
    getCategoryTasks({
      categoryId: catId,
      setTasks: setCategoryTasks,
      uid: user.uid,
    });
  };

  useEffect(() => {
    if (categories?.length > 0) {
      getTasks(categories[0].id);
      setCategory(categories[0]);
    } else {
      navigation.navigate("Home");
    }
  }, []);
  return (
    <>
      {categories ? (
        categories.length > 0 ? (
          categories.map((category, index) => {
            return (
              <CategoryDrawerItem
                category={category}
                index={index}
                key={index}
                isActive={isActive}
                navigation={navigation}
                getTasks={getTasks}
                setCategory={setCategory}
                setSelIndex={setSelIndex}
              />
            );
          })
        ) : (
          <Text>No categories added</Text>
        )
      ) : (
        <ActivityIndicator size="small" />
      )}
    </>
  );
}

export function CategoriesDropdown({ categories, closeMenu, user }) {
  const setCategory = useCategoryStore((state) => state.setCategory);

  const setCategoryTasks = useTaskStore((state) => state.setCategoryTasks);

  const getTasks = async (catId) => {
    setCategoryTasks([]);
    getCategoryTasks({
      categoryId: catId,
      setTasks: setCategoryTasks,
      uid: user.uid,
    });
  };
  return (
    <ScrollView style={{ maxHeight: 300 }}>
      {categories.map((category, index) => {
        return (
          <Menu.Item
            key={category.id}
            onPress={() => {
              runOnJS(() => {
                getTasks(category.id);
                setCategory(category);
                closeMenu();
              })();
            }}
            style={style.menuItem}
            title={category.title}
          />
        );
      })}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  menuItem: { minWidth: "100%" },
  drawerItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
