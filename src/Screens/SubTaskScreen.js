import { View, Text, StyleSheet } from "react-native";
import { useDatabaseStore } from "../Stores/databaseStore";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../DL/TasksDL";
import TaskDetails from "../Components/TaskDetails";
import { useTheme } from "react-native-paper";

const SubTaskScreen = ({ navigation, route }) => {

  const theme = useTheme()
  const style = styles(theme)

  const [t,setTask] = useState(null)
  if (route.params === undefined) {
    setTimeout(() => {
      navigation.navigate("app", { Screen: "Category" });
    }, 2000);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
        <Text>Something went wrong redirecting...</Text>
      </View>
    );
  }
  const { taskId } = route.params;
  
  const getTaskDetailsFromDB = async() => {
    setTask(await getTaskDetails(taskId))
  }

  useEffect(() => {
    getTaskDetailsFromDB()
  },[])

  return (
    <View style={style.tdContainer}>
      {t && <TaskDetails task={t} taskId={taskId} />}
    </View>
  );
};

const styles = (props) => StyleSheet.create({
  tdContainer:{
      flex:1,
      padding:10,
      backgroundColor:props.colors.background,
  }
})


export default SubTaskScreen;
