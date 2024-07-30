import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDatabaseStore } from "../Stores/databaseStore";
import { useEffect, useState } from "react";
import TaskDetails from "../Components/TaskDetails";
import { useTheme } from "react-native-paper";
import { getTaskDetails } from "../DL/firebaseFunctions";

const SubTaskScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const style = styles(theme);

  const [t, setTask] = useState(null);
  const [subTasks, setSubTasks] = useState([]);
  if (route.params === undefined) {
    setTimeout(() => {
      navigation.navigate("app", { Screen: "Category" });
    }, 2000);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something went wrong redirecting...</Text>
      </View>
    );
  }
  const { taskId } = route.params;

  const getTaskDetailsFromDB = async () => {
    getTaskDetails({ taskId, setTask, setSubtasks: setSubTasks });
  };

  useEffect(() => {
    getTaskDetailsFromDB();
  }, []);

  return (
    <ScrollView
      style={style.tdContainer}
      contentContainerStyle={{ padding: 10, alignItems: "center" }}
    >
      {t && <TaskDetails task={t} subTasks={subTasks} taskId={taskId} />}
    </ScrollView>
  );
};

const styles = (props) =>
  StyleSheet.create({
    tdContainer: {
      flex: 1,
      backgroundColor: props.colors.background,
    },
  });

export default SubTaskScreen;
