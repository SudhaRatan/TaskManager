import { useState } from "react";
import {
  Icon,
  Surface,
  TouchableRipple,
  useTheme,
  Text,
  Menu,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { checkTask } from "../DL/TasksDL";

const CategoryTask = ({ task, del }) => {
  const [selected, setSelected] = useState(task.isChecked);
  const [menuVisible, setMenuvisible] = useState(false);

  const theme = useTheme();

  return (
    <Surface
      elevation={1}
      style={[
        style.container,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <TouchableRipple
        onPress={async () => {
          setSelected(!selected);
          checkTask(task);
        }}
        onLongPress={() => {
          setMenuvisible(true);
        }}
      >
        <View style={style.surface}>
          <Icon
            size={20}
            source={selected ? "check-circle" : "radiobox-blank"}
          />
          <Text
            style={[
              style.text,
              {
                textDecorationLine: selected ? "line-through" : "none",
              },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <Menu
            visible={menuVisible}
            anchorPosition="bottom"
            onDismiss={() => setMenuvisible(false)}
            anchor={<View style={{ height: 1, width: 1 }} />}
          >
            <Menu.Item leadingIcon="pencil" onPress={() => {}} title="Edit" />
            <Menu.Item
              leadingIcon="delete"
              onPress={() => {
                setMenuvisible(false);
                del(task);
              }}
              title="Delete"
            />
          </Menu>
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
  },
});

export default CategoryTask;
