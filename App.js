import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/Navigation";
import { useDatabaseStore } from "./src/Stores/databaseStore";
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

const database = useDatabaseStore.getState().database;

export default function App() {
  return (
    <NavigationContainer linking={true}>
      <StatusBar style="dark" />
      <Navigation />
    </NavigationContainer>
  );
}
