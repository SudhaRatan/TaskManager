import { withObservables } from "@nozbe/watermelondb/react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import SubTaskTask from "./SubTaskTask";
import { useState } from "react";
import { AddSubTask } from "../DL/SubTaskDL";

const TaskDetails = ({ task, subTasks }) => {

  const [subTaskTitle, setTitle] = useState("");

  const theme = useTheme();

  const style = styles(theme);

  const addSubTask = () => {
    if (subTaskTitle !== "") {
      AddSubTask({ title: subTaskTitle, taskId: task.id })
        .then((newSubTask) => {
          setTitle("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View
      style={{ flex: 1, gap: 5, width: useBreakPoint("100%", "75%", "50%") }}
    >
      <Text style={style.text}>{task.title}</Text>
      <Text style={{ color: theme.colors.secondary }}>Add sub tasks</Text>
      <TextInput
        value={subTaskTitle}
        right={
          <TextInput.Icon onPress={addSubTask} icon="plus-box" size={30} />
        }
        placeholder="Type a subtask..."
        label="Sub task"
        mode="outlined"
        style={{ backgroundColor: theme.colors.background }}
        onChangeText={setTitle}
      />
      <ScrollView>
        {subTasks && subTasks.map((item) => {
          return <SubTaskTask key={item.id} SubTask={item} />;
        })}
      </ScrollView>
      <TextInput label="Description" multiline numberOfLines={3} />
      <Button mode="contained-tonal" disabled onPress={() => {}}>Save</Button>
    </View>
  );
};

const enhance = withObservables(["task"], ({ task }) => ({
  task,
  subTasks: task.subTasks,
}));

const styles = (props) =>
  StyleSheet.create({
    text: {
      fontSize: 20,
      fontWeight: 700,
    },
  });

export default enhance(TaskDetails);
