import { View, Text } from "react-native";
import React from "react";
import { withObservables } from "@nozbe/watermelondb/react";

const SubTaskTask = ({SubTask}) => {
  // console.log(subTask)
  return (
    <View>
      <Text>{SubTask.title}</Text>
    </View>
  );
};

export default SubTaskTask;
