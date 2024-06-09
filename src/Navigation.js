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
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5e9fack2km1Nx1zUN2BgQWhECJhdrHoY",
  authDomain: "taskmanager-2a678.firebaseapp.com",
  projectId: "taskmanager-2a678",
  storageBucket: "taskmanager-2a678.appspot.com",
  messagingSenderId: "570152310936",
  appId: "1:570152310936:web:2917ba1233a6e7afa858ed",
  measurementId: "G-KNS61B863G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ cacheSizeBytes: CACHE_SIZE_UNLIMITED }),
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
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
      <Stack.Screen
        options={({ navigation }) => ({
          presentation: "modal",
          headerTitle: "Task details",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: theme.colors.background,
          },
          header: () => <TaskDetailsHeader navigation={navigation} />,
        })}
        name="subtask"
        component={SubTaskScreen}
      />
    </Stack.Navigator>
  );
}

function MainDrawer() {
  const category = useCategoryStore((state) => state.category);
  return (
    <Drawer.Navigator
      screenOptions={({navigation,route}) => ({
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
