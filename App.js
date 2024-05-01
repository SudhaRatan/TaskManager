import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Navigation />
    </NavigationContainer>
  );
}
