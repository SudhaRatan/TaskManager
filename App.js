import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/Navigation";
import { useDatabaseStore } from "./src/Stores/databaseStore";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import { View } from "react-native";

const database = useDatabaseStore.getState().database;

export default function App() {
  const theme = useTheme();
  return (
    <PaperProvider>
      <NavigationContainer linking={true}>
        <StatusBar style="auto" />
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
}
