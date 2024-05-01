import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "./Screens/Index";
import Test from "./Screens/test";
import NavigationDrawer from "./Components/NavigationDrawer";
import { Text, View } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={Index} />
      <Stack.Screen
        name="test"
        component={MainDrawer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
        drawerType:"back",
    }}
    drawerContent={(props) => <NavigationDrawer {...props} />}
    >
      <Drawer.Screen name="index" options={{
        drawerLabel:"Main"
      }} component={Test} />
      <Drawer.Screen name="index1" component={() => <View><Text>Ratan</Text></View>} />
    </Drawer.Navigator>
  );
}
