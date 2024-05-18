import { withObservables } from "@nozbe/watermelondb/react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

const TaskDetails = ({ task, subTasks }) => {
  console.log({ task, subTasks });

  const theme = useTheme()

  const style = styles(theme)

  return (
    <View>
      <Text style={style.text}>{task.title}</Text>
    </View>
  );
};

const enhance = withObservables(["task"], ({ task }) => ({
  task,
  subTasks: task.subTasks,
}));

const styles = (props) => StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:700
    }
})

export default enhance(TaskDetails);
