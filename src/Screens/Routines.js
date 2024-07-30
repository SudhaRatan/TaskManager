import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";
import Routine from "../Components/Routine";

const Routines = () => {
  const theme = useTheme();
  const style = styles(theme);
  const width =
    Dimensions.get("screen").width < 40
      ? Dimensions.get("screen").width / 20
      : 22;

  return (
    <View style={style.routineCont}>
      <ScrollView
        contentContainerStyle={
          Platform.OS === "web"
            ? {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                gap: 5,
              }
            : {
                gap: 5,
              }
        }
      >
        <Routine theme={theme} width={width} />
        <Routine theme={theme} width={width} />
        <Routine theme={theme} width={width} />
        <Routine theme={theme} width={width} />
        <Routine theme={theme} width={width} />
        <Routine theme={theme} width={width} />
        <Routine theme={theme} width={width} />
      </ScrollView>
    </View>
  );
};

export default Routines;

const styles = (props) =>
  StyleSheet.create({
    routineCont: {
      flex: 1,
      backgroundColor: props.colors.background,
      padding: 10,
    },
  });
