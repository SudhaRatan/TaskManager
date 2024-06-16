import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Index from "./Screens/Index";
import NavigationDrawer from "./Components/NavigationDrawer";
import { useBreakPoint } from "./utils/breakpoint";
import Home from "./Screens/Home";
import CategoryScreen from "./Screens/CategoryScreen";
import { useCategoryStore } from "./Stores/categoryStore";
import CategoryHeaderOptions from "./Components/CategoryHeaderOptions";
import SubTaskScreen from "./Screens/SubTaskScreen";
import { useTheme } from "react-native-paper";
import TaskDetailsHeader from "./Components/TaskDetailsHeader";
import DrawerHeader from "./Components/DrawerHeader";
import { useAuthStore } from "./Stores/authStore";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
      {!user ? (
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
          component={Index}
        />
      ) : (
        <>
          <Stack.Screen
            name="app"
            component={MainDrawer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={(props) => ({
              presentation: "modal",
              headerTitle: "Task details",
              headerStyle: {
                borderBottomWidth: 0,
                backgroundColor: theme.colors.background,
              },
              header: () => <TaskDetailsHeader {...props} />,
            })}
            name="subtask"
            component={SubTaskScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function MainDrawer() {
  const category = useCategoryStore((state) => state.category);
  return (
    <Drawer.Navigator
      screenOptions={({ navigation, route }) => ({
        drawerType: useBreakPoint("front", "front", "permanent"),
        header: () => <DrawerHeader navigation={navigation} route={route} />,
      })}
      drawerContent={(props) => <NavigationDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Category"
        options={({ navigation, route }) => ({
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
          },
          headerTitle: category ? category.title : "Category",
          headerRight: () => <CategoryHeaderOptions />,
        })}
        component={CategoryScreen}
      />
    </Drawer.Navigator>
  );
}
