import { withObservables } from "@nozbe/watermelondb/react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import SubTaskTask from "../Observables/SubTaskTask";
import { useEffect, useState } from "react";
import { AddSubTask } from "../DL/SubTaskDL";
import { UpdateTaskDescription } from "../DL/TasksDL";

const TaskDetails = ({ task, subTasks }) => {
  const [subTaskTitle, setTitle] = useState("");
  const [taskDesc, setDesc] = useState(task.description);
  const [descIcon, setDescIcon] = useState("");

  const taskDescription = task.description

  const UpdateDescription = async () => {
    await UpdateTaskDescription({ task: task, description: taskDesc });
  };

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

  // for saving description using debouncing
  useEffect(() => {
    var unsub;
    if (taskDesc !== "" && taskDesc !== taskDescription) {
      setDescIcon("content-save");
      unsub = setTimeout(async () => {
        await UpdateDescription();
        setDescIcon("check");
      }, 2000);
    }

    return () => clearTimeout(unsub);
  }, [taskDesc]);

  return (
    <ScrollView
      style={{ width: useBreakPoint("100%", "75%", "50%") }}
      contentContainerStyle={{ flex: 1, gap: 10 }}
    >
      <Text style={style.text}>{task.title}</Text>
      <Text style={{ color: theme.colors.secondary }}>Add sub tasks</Text>
      <TextInput
        value={subTaskTitle}
        right={
          subTaskTitle !== "" && (
            <TextInput.Icon onPress={addSubTask} icon="plus-box" size={30} />
          )
        }
        placeholder="Type a subtask..."
        label="Sub task"
        mode="outlined"
        style={{ backgroundColor: theme.colors.background }}
        onChangeText={setTitle}
        onSubmitEditing={addSubTask}
      />
      <View style={{ gap: 5 }}>
        {subTasks &&
          subTasks.map((item) => {
            return <SubTaskTask key={item.id} SubTask={item} />;
          })}
      </View>
      <TextInput
        label="Description"
        multiline
        placeholder="Add description for your task"
        value={taskDesc}
        onChangeText={setDesc}
        right={<TextInput.Icon icon={descIcon} />}
        style={{ backgroundColor: theme.colors.secondaryContainer }}
      />
    </ScrollView>
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
