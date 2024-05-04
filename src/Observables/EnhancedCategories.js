import { withObservables } from "@nozbe/watermelondb/react";
import { useDatabaseStore } from "../Stores/databaseStore";
import { Drawer, List } from "react-native-paper";
import { useState } from "react";

const database = useDatabaseStore.getState().database;

function Categories({ categories, navigation, state }) {
  const [selIndex, setSelIndex] = useState(0);
  const isActive = (index) => {
    if (state.index === 1 && selIndex === index) {
      return true;
    }
    return false;
  };
  return (
    <>
      {categories.map((category, index) => {
        return (
          <Drawer.Item
            key={index}
            label={category.title}
            active={isActive(index)}
            onPress={() => {
              setSelIndex(index);
              navigation.navigate("Category");
            }}
          />
        );
      })}
    </>
  );
}

const enhance = withObservables([""], () => ({
  categories: database.collections.get("categories").query().observe(),
}));

const EnhancedCategories = enhance(Categories);

export default EnhancedCategories;
