import React, { useState } from "react";
import {
  Icon,
  Surface,
  TouchableRipple,
  useTheme,
  Text,
} from "react-native-paper";
import { checkTask } from "../DL/TasksDL";

const CategoryTask = ({ task, index }) => {
  const [selected, setSelected] = useState(task.isChecked);
  console.log(task.isChecked);
  const theme = useTheme();
  return (
    <TouchableRipple
      onPress={async () => {
        setSelected(!selected);
        checkTask(task);
      }}
      style={{
        justifyContent: "center",
        borderRadius: 5,
      }}
    >
      <Surface
        elevation={1}
        style={{
          flexDirection: "row",
          padding: 10,
          gap: 10,
          backgroundColor: theme.colors.primaryContainer,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Icon size={20} source={selected ? "check-circle" : "radiobox-blank"} />
        <Text
          style={{
            verticalAlign: "middle",
            textAlignVertical: "center",
            textDecorationLine: selected ? "line-through" : "none",
          }}
        >
          {task.title}
        </Text>
      </Surface>
    </TouchableRipple>
  );
};

export default CategoryTask;
