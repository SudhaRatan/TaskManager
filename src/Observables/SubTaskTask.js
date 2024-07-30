import {
  Icon,
  Surface,
  TouchableRipple,
  useTheme,
  Text,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";

const SubTaskTask = ({ SubTask, checksubTask, deletesubTask }) => {
  const theme = useTheme();

  return (
    <Surface
      elevation={1}
      style={[
        style.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
      c
    >
      <TouchableRipple
        onPress={async () => {
          checksubTask(SubTask);
        }}
      >
        <View style={style.surface}>
          <Icon
            size={20}
            source={SubTask.isChecked ? "check-circle" : "radiobox-blank"}
            color={theme.colors.primary}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={[
                style.text,
                {
                  textDecorationLine: SubTask.isChecked
                    ? "line-through"
                    : "none",
                  color: theme.colors.primary,
                },
              ]}
            >
              {SubTask.title}
            </Text>
          </View>
          <TouchableRipple
            style={{}}
            onPress={() => {
              deletesubTask(SubTask);
            }}
          >
            <Icon source="delete" color={theme.colors.secondary} size={24} />
          </TouchableRipple>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 5,
  },
  surface: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    verticalAlign: "middle",
    textAlignVertical: "center",
    fontSize: 15,
    flex: 1,
  },
});

export default SubTaskTask;
