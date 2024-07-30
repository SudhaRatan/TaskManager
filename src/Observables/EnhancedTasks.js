import { ScrollView, StyleSheet, View } from "react-native";
import CategoryTask from "../Components/CategoryTask";
import { useBreakPoint } from "../utils/breakpoint";
import { ActivityIndicator, Text } from "react-native-paper";


const CategoryTasks = ({ tasks, ShowDeleteDialog,navigation }) => {
  const styles = style({ useBreakPoint });

  return (
    <ScrollView
      style={{
        marginVertical: 10,
      }}
      contentContainerStyle={styles.scrollContainer}
    >
      {tasks ? tasks.length > 0 ? tasks.map((task, index) => {
        return (
          <CategoryTask
            del={ShowDeleteDialog}
            task={task}
            index={index}
            key={index}
            navigation={navigation}
          />
        );
      }): <Text>No tasks added</Text> : <ActivityIndicator size="large" />}
    </ScrollView>
  );
};

const style = (props) =>
  StyleSheet.create({
    scrollContainer: {
      gap: 5,
      paddingTop: 0,
      paddingHorizontal: props.useBreakPoint(15, 25, 40),
    },
  });

export default CategoryTasks;
