import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, FAB } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AddCategory from "../Components/AddCategory";

const Home = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    openMenu();
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);
  const fab = useSharedValue(0);

  const openMenu = () => {
    if (fab.value === 0) {
      fab.value = withSpring(1, { damping: 20, stiffness: 200 });
    } else {
      fab.value = withTiming(0);
    }
  };

  const [menuHeight, setMenuHeight] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);

  return (
    <View style={style.HomeContainer}>
      <ScrollView>
        <Text>Home</Text>
      </ScrollView>
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
                translateX: interpolate(fab.value, [0, 1], [menuWidth * 2, 0]),
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
      <AddCategory visible={visible} hideDialog={hideDialog} />
    </View>
  );
};

const style = StyleSheet.create({
  HomeContainer: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
