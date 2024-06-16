import { View } from "react-native";
import React from "react";
import { Appbar, Text } from "react-native-paper";
import { useNavigationState } from "@react-navigation/native";

const TaskDetailsHeader = ({ navigation }) => {
  const index = useNavigationState((state) => state.index);
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          if (index > 0) {
            navigation.goBack();
          } else {
            navigation.navigate("app");
            navigation.reset({
              index: 0,
              routes: [{ name: "app" }],
            });
          }
        }}
      />
      <Appbar.Content title="Task details" />
    </Appbar.Header>
  );
};

export default TaskDetailsHeader;
