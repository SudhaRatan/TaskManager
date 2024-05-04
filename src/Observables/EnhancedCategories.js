import { withObservables } from "@nozbe/watermelondb/react";
import { useDatabaseStore } from "../Stores/databaseStore";
import { List } from "react-native-paper";

const database = useDatabaseStore.getState().database;

function Categories({ categories }) {
  return (
    <>
      {categories.map((category) => {
        return (
          <List.Item
            key={category.id}
            title={category.title}
            onPress={() => console.log("pressed")}
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
