import { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text, FAB, useTheme, List } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AddCategory from "../Components/AddCategory";
import AddTask from "../Components/AddTask";
import { useAuthStore } from "../Stores/authStore";
import {
  deleteTask,
  getRecentTasks,
  getTodayTasks,
} from "../DL/firebaseFunctions";
import CategoryTask from "../Components/CategoryTask";
import { useBreakPoint } from "../utils/breakpoint";
import ConfirmDialog from "../Components/ConfirmDialog";

const Home = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const [myDayExpand, setMyDayExpand] = useState(true);
  const [recentExpand, setRecentExpand] = useState(true);

  const [fabState, setFabState] = useState({ open: false });

  const onStateChange = ({ open }) => setFabState({ open });
  const user = useAuthStore((state) => state.user);

  const [menuHeight, setMenuHeight] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);

  const [recentTasks, setRecentTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);

  const DeleteRef = useRef();
  const ShowDeleteDialog = (task) => {
    DeleteRef.current.showDialog();
    DeleteRef.current.setParams(task);
  };

  const { open } = fabState;

  const showDialog = () => {
    openMenu();
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const showTaskDialog = () => {
    openMenu();
    setAddTaskVisible(true);
  };

  const hideTaskDialog = () => {
    setAddTaskVisible(false);
  };

  const fab = useSharedValue(0);

  const openMenu = () => {
    if (fab.value === 0) {
      fab.value = withSpring(1, { damping: 20, stiffness: 200 });
    } else {
      fab.value = withTiming(0);
    }
  };

  const theme = useTheme();
  const style = styles(theme);

  useEffect(() => {
    getTodayTasks({ userId: user.uid, setTasks: setTodayTasks });
    getRecentTasks({ userId: user.uid, setTasks: setRecentTasks });
  }, []);

  return (
    <View style={style.HomeContainer}>
      <ScrollView>
        <List.Accordion
          expanded={myDayExpand}
          onPress={() => setMyDayExpand(!myDayExpand)}
          title="My day"
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: useBreakPoint(15, 25, 40),
              gap: 5,
            }}
          >
            {todayTasks.map((task) => {
              return (
                <CategoryTask
                  key={task.id}
                  task={task}
                  navigation={navigation}
                  del={ShowDeleteDialog}
                />
              );
            })}
          </ScrollView>
        </List.Accordion>
        <List.Accordion
          expanded={recentExpand}
          onPress={() => setRecentExpand(!recentExpand)}
          title="Recent tasks"
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: useBreakPoint(15, 25, 40),
              gap: 5,
            }}
          >
            {recentTasks.map((task) => {
              return (
                <CategoryTask
                  key={task.id}
                  task={task}
                  navigation={navigation}
                  del={ShowDeleteDialog}
                />
              );
            })}
          </ScrollView>
        </List.Accordion>
      </ScrollView>
      {Platform.OS === "web" ? (
        <>
          <Animated.View
            style={[
              style.fab,
              useAnimatedStyle(() => ({
                transform: [
                  {
                    translateY: interpolate(
                      fab.value,
                      [0, 1],
                      [menuHeight / 2, -menuHeight]
                    ),
                  },
                  { scale: interpolate(fab.value, [0, 1], [0.3, 1]) },
                  {
                    translateX: interpolate(
                      fab.value,
                      [0, 1],
                      [menuWidth * 2, 0]
                    ),
                  },
                ],
              })),
              { gap: 5, paddingBottom: 10 },
            ]}
          >
            <FAB
              icon="shape-plus"
              label="Category"
              onPress={showDialog}
              size="medium"
            />
            <FAB
              icon="checkbox-marked-circle-plus-outline"
              label="Task"
              size="medium"
              onPress={showTaskDialog}
            />
          </Animated.View>
          <FAB
            onLayout={({
              nativeEvent: {
                layout: { height, width },
              },
            }) => {
              setMenuHeight(height);
              setMenuWidth(width);
            }}
            icon="plus"
            style={style.fab}
            size="medium"
            onPress={openMenu}
          />
        </>
      ) : (
        <FAB.Group
          icon="plus"
          open={open}
          visible
          onStateChange={onStateChange}
          onPress={() => {}}
          actions={[
            { icon: "shape-plus", label: "Category", onPress: showDialog },
            {
              icon: "checkbox-marked-circle-plus-outline",
              label: "Task",
              onPress: showTaskDialog,
            },
          ]}
        />
      )}
      <AddCategory user={user} visible={visible} hideDialog={hideDialog} />
      <AddTask
        user={user}
        visible={addTaskVisible}
        hideDialog={hideTaskDialog}
      />
      <ConfirmDialog
        ref={DeleteRef}
        text="Are you sure you want to delete this task?"
        okText="Delete"
        iconName="alert"
        action={(task) => {
          deleteTask({ taskId: task.id });
        }}
      />
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    HomeContainer: {
      flex: 1,
      backgroundColor: props.colors.background,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

export default Home;
