import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Divider, Text, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import SubTaskTask from "../Observables/SubTaskTask";
import { useEffect, useState } from "react";
import {
  checkSubTask,
  createSubTask,
  deleteSubTask,
  updateTaskdescription,
} from "../DL/firebaseFunctions";

const TaskDetails = ({ task, subTasks }) => {
  const [subTaskTitle, setTitle] = useState("");
  const [taskDesc, setDesc] = useState(task.description);
  const [descIcon, setDescIcon] = useState("");
  const [reminder, setReminder] = useState(false);

  const taskDescription = task.description;

  const UpdateDescription = async () => {
    updateTaskdescription({
      selectedTaskId: task.id,
      taskDescription: taskDesc,
    });
  };

  const theme = useTheme();

  const style = styles(theme);

  const addSubTask = () => {
    Keyboard.dismiss();
    if (subTaskTitle !== "") {
      createSubTask({ subtaskTitle: subTaskTitle, selectedTaskId: task.id });
      setTitle("");
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
      }, 1000);
    }

    return () => clearTimeout(unsub);
  }, [taskDesc]);

  useEffect(() => {
    setDesc(taskDescription);
  }, [taskDescription]);

  return (
    <View
      style={{ width: useBreakPoint("100%", "75%", "50%"), flex: 1, gap: 10 }}
    >
      <Text style={style.text}>{task.title}</Text>
      <TextInput
        value={subTaskTitle}
        right={
          subTaskTitle !== "" && (
            <TextInput.Icon onPress={addSubTask} icon="plus-box" size={30} />
          )
        }
        placeholder="Type a subtask..."
        label="Add a sub task"
        mode="outlined"
        style={{ backgroundColor: theme.colors.background }}
        onChangeText={setTitle}
        onSubmitEditing={addSubTask}
      />
      <View style={{ gap: 5 }}>
        {subTasks &&
          subTasks.map((item) => {
            return (
              <SubTaskTask
                checksubTask={(SubTask) => {
                  checkSubTask({ subtask: SubTask, taskId: task.id });
                }}
                deletesubTask={(SubTask) => {
                  deleteSubTask({ taskId: task.id, subtaskId: SubTask.id });
                }}
                key={item.id}
                SubTask={item}
              />
            );
          })}
      </View>
      <Divider />
      {/* <Chip
        selected={reminder}
        showSelectedOverlay={reminder}
        onPress={() => setReminder(!reminder)}
        textStyle={{ padding: 5 }}
        icon={reminder ? "calendar-check" : "calendar-clock"}
      >
        Reminder
      </Chip> */}
      <TextInput
        label="Description"
        multiline
        placeholder="Add description for your task"
        value={taskDesc}
        onChangeText={setDesc}
        right={<TextInput.Icon icon={descIcon} />}
        style={{ backgroundColor: theme.colors.secondaryContainer }}
      />
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    text: {
      fontSize: 20,
      fontWeight: 700,
    },
  });

export default TaskDetails;
