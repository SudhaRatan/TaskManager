import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const Index = ({ navigation }) => {

  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ gap: 10, alignItems: "flex-start",width:"100%",padding:20 }}>
        <Text>Login</Text>
        <TextInput
          label="Email"
          value={text}
          mode="flat"
          style={{width:"100%"}}
          onChangeText={(text) => setText(text)}
        />
        <Button
          mode="contained"
          elevation={2}
          onPress={() => navigation.navigate("test")}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

export default Index;
