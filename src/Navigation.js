import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "./Screens/Index";
import NavigationDrawer from "./Components/NavigationDrawer";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useBreakPoint } from "./utils/breakpoint";
import Home from "./Screens/Home";
import CategoryScreen from "./Screens/CategoryScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
          component={Index}
        />
        <Stack.Screen
          name="app"
          component={MainDrawer}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: useBreakPoint("front", "front", "permanent"),
      }}
      drawerContent={(props) => <NavigationDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Main",
        }}
        component={Home}
      />
      <Drawer.Screen name="Category" component={CategoryScreen} />
    </Drawer.Navigator>
  );
}
