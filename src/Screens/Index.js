import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";

const Index = ({ navigation }) => {
  const [text, setText] = useState("");

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.loginContainer,
          { width: useBreakPoint("100%", "70%", "50%") },
        ]}
      >
        <Text variant="displaySmall">Login</Text>
        <TextInput
          label="Email"
          value={text}
          mode="flat"
          style={{ width: "100%" }}
          onChangeText={(text) => setText(text)}
        />
        <Button
          mode="contained"
          elevation={2}
          onPress={() => navigation.navigate("app")}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loginContainer: {
    gap: 10,
    alignItems: "flex-start",
    padding: 20,
  },
});

export default Index;
