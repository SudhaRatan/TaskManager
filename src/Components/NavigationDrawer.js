import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Drawer, Text, Button, List } from "react-native-paper";
import { useDatabaseStore } from "../Stores/databaseStore";
import EnhancedCategories from "../Observables/EnhancedCategories";

const NavigationDrawer = ({ state, navigation, descriptors }) => {
  const [catAcc, setCatAcc] = useState(true);
  const [categories, setCategories] = useState([]);

  const isSelected = (index) => index === state.index;

  const database = useDatabaseStore((state) => state.database);

  const categoriesCollection = database.get("categories");

  const getCategories = async () => {
    const categors = await categoriesCollection.query().fetch();
    setCategories(categors);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <DrawerContentScrollView>
        <Text
          variant="headlineLarge"
          style={{ textAlign: "center", padding: 10 }}
        >
          Task Manager
        </Text>
        {state.routes.map((item, index) => {
          if (index === 0)
            return (
              <Drawer.Item
                key={item.key}
                label={item.name}
                active={isSelected(index)}
                onPress={() => {
                  navigation.navigate(item.name);
                }}
              />
            );
        })}
        <List.Accordion
          expanded={catAcc}
          onPress={() => setCatAcc(!catAcc)}
          title="Categories"
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          <EnhancedCategories navigation={navigation} categories={categories} state={state} />
        </List.Accordion>
      </DrawerContentScrollView>
      <View>
        <Button mode="text" onPress={() => navigation.navigate("login")}>
          Logout
        </Button>
      </View>
    </>
  );
};

export default NavigationDrawer;
