import { View } from "react-native";
import React from "react";
import { Appbar, Text } from "react-native-paper";

const TaskDetailsHeader = ({navigation}) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()}/>
      <Appbar.Content title="Task details" />
    </Appbar.Header>
  );
};

export default TaskDetailsHeader;
