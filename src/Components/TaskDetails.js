import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Chip,
  Divider,
  Icon,
  Text,
  TextInput,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import SubTaskTask from "../Observables/SubTaskTask";
import { useCallback, useEffect, useState } from "react";
import {
  checkSubTask,
  createSubTask,
  deleteSubTask,
  removeTaskReminder,
  setTaskReminder,
  updateTaskdescription,
} from "../DL/firebaseFunctions";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";

const TaskDetails = ({ task, subTasks }) => {
  const [subTaskTitle, setTitle] = useState("");
  const [taskDesc, setDesc] = useState(task.description);
  const [descIcon, setDescIcon] = useState("");
  const [reminder, setReminder] = useState(false);

  const prevDateTime = task?.reminder?.toDate();

  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [reminderDateTime, setReminderDateTime] = useState(prevDateTime);

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

  const handleReminder = () => {
    setOpen(true);
    setDate(new Date());
    // setReminder(!reminder);
  };

  const onDismissSingle = () => {
    setDate(undefined);
    setOpen(false);
    setReminderDateTime(prevDateTime);
  };

  const onConfirmSingle = (params) => {
    setOpen(false);
    setDate(() => params.date);
    setVisible(true);
  };

  const onDismiss = useCallback(() => {
    setVisible(false);
    setDate(undefined);
    setReminderDateTime(prevDateTime);
  }, [setVisible]);

  const onConfirm = ({ hours, minutes }) => {
    setVisible(false);
    var d = date.toString().split(" ");
    d[4] = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:00`;
    setReminderDateTime(d.join(" "));
    setTaskReminder({ taskId: task.id, reminder: d.join(" ") });
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
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Chip
          selected={reminder}
          showSelectedOverlay={reminder}
          onPress={handleReminder}
          textStyle={{ padding: 5 }}
          icon={reminder ? "calendar-check" : "calendar-clock"}
          style={{ flex: 1 }}
        >
          {reminderDateTime
            ? `On ${new Date(
                reminderDateTime
              ).toLocaleDateString()} at ${new Date(reminderDateTime)
                .toLocaleTimeString()
                .split(" ")[0]
                .slice(0, 5)} ${
                new Date(reminderDateTime).toLocaleTimeString().split(" ")[1]
              }`
            : "Reminder ?"}
        </Chip>
        {reminderDateTime && (
          <Button
            mode="contained-tonal"
            style={{
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.errorContainer,
            }}
            onPress={() => {
              setReminderDateTime(null);
              removeTaskReminder({ taskId: task.id });
            }}
          >
            <Icon color={theme.colors.error} source="cancel" size={22} />
          </Button>
        )}
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
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
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
