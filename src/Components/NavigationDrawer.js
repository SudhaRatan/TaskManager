import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Drawer, Text, Button, List, useTheme } from "react-native-paper";
import { Categories } from "../Observables/EnhancedCategories";
import { useCategoryStore } from "../Stores/categoryStore";
import { getCategories } from "../DL/firebaseFunctions";
import { useAuthStore } from "../Stores/authStore";
import { signOut } from "firebase/auth";
import { useDatabaseStore } from "../Stores/databaseStore";
const NavigationDrawer = ({ state, navigation, descriptors }) => {
  const [catAcc, setCatAcc] = useState(true);

  const setCategory = useCategoryStore((state) => state.setCategory);
  const categories = useCategoryStore((state) => state.categories);
  const setCategories = useCategoryStore((state) => state.setCategories);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const auth = useDatabaseStore((state) => state.auth);

  const isSelected = (index) => index === state.index;
  const theme = useTheme();

  useEffect(() => {
    getCategories({ setCategories, user });
  }, []);

  return (
    <>
      <DrawerContentScrollView
        style={{ backgroundColor: theme.colors.background }}
      >
        <Text
          variant="headlineSmall"
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
                  setCategory(null);
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
          <Categories
            navigation={navigation}
            state={state}
            user={user}
            categories={categories}
          />
        </List.Accordion>
      </DrawerContentScrollView>
      <View style={{ backgroundColor: theme.colors.background }}>
        <Button
          mode="text"
          onPress={() => {
            signOut(auth);
            setUser(null);
          }}
        >
          Logout
        </Button>
      </View>
    </>
  );
};

export default NavigationDrawer;
