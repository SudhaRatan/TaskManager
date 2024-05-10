import { ScrollView, StyleSheet, View } from "react-native";
import CategoryTask from "../Components/CategoryTask";
import { useBreakPoint } from "../utils/breakpoint";


const CategoryTasks = ({ tasks, ShowDeleteDialog }) => {
  const styles = style({ useBreakPoint });

  return (
    <ScrollView
      style={{
        marginVertical: 10,
      }}
      contentContainerStyle={styles.scrollContainer}
    >
      {tasks.map((task, index) => {
        return (
          <CategoryTask
            del={ShowDeleteDialog}
            task={task}
            index={index}
            key={index}
          />
        );
      })}
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
