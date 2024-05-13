import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Drawer,
  Text,
  Button,
  List,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { EnhancedCategories } from "../Observables/EnhancedCategories";
import { getCategories } from "../DL/CategoriesDL";
import { useCategoryStore } from "../Stores/categoryStore";
const NavigationDrawer = ({ state, navigation, descriptors }) => {
  const [catAcc, setCatAcc] = useState(true);

  const setStoreCategory = useCategoryStore((state) => state.setCategory);

  const isSelected = (index) => index === state.index;

  const getCategoriesDB = async () => {
    const categors = await getCategories();
    setStoreCategory(categors[0]);
  };

  useEffect(() => {
    getCategoriesDB();
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
                  setStoreCategory(null);
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
          <EnhancedCategories
            navigation={navigation}
            state={state}
          />
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
