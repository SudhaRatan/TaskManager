import { useState } from "react";
import {
  Icon,
  Surface,
  TouchableRipple,
  useTheme,
  Text,
  Menu,
  TextInput,
} from "react-native-paper";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { checkTask, upadateTasktitle } from "../DL/firebaseFunctions";

const CategoryTask = ({ task, del, categoryId, navigation }) => {
  const [menuVisible, setMenuvisible] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const [height1, setHeight] = useState(0);

  const theme = useTheme();
  const handleEditButton = () => {
    setMenuvisible(false);
    setCanEdit(true);
  };
  const upadateTaskTitle = () => {
    setCanEdit(false);
    upadateTasktitle({ taskId: task.id, title: editText });
  };

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
        onPress={() => {
          if (!canEdit) navigation.navigate("subtask", { taskId: task.id });
        }}
        onLongPress={() => {
          setMenuvisible(true);
        }}
      >
        <View
          style={style.surface}
          onContextMenu={(e) => {
            e.preventDefault();
            if (Platform.OS === "web") {
              setMenuvisible(true);
            }
          }}
        >
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              checkTask({ task });
            }}
          >
            <Icon
              size={20}
              source={task.isChecked ? "check-circle" : "radiobox-blank"}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          {canEdit ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <TextInput
                autoFocus
                style={{ height: height1, flex: 1 }}
                onBlur={() => {
                  setTimeout(() => {
                    setCanEdit(false);
                  }, 300);
                }}
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    upadateTaskTitle();
                  }
                }}
                onSubmitEditing={upadateTaskTitle}
                value={editText}
                onChangeText={setEditText}
              />
              <TouchableRipple
                onPress={() => {
                  setCanEdit(false);
                  setEditText(task.title);
                }}
              >
                <Icon source="close" size={24} />
              </TouchableRipple>
              <TouchableRipple onPress={upadateTaskTitle}>
                <Icon source="check" size={24} />
              </TouchableRipple>
            </View>
          ) : (
            <Text
              onLayout={({
                nativeEvent: {
                  layout: { height },
                },
              }) => {
                setHeight(height + 10);
              }}
              style={[
                style.text,
                {
                  textDecorationLine: task.isChecked ? "line-through" : "none",
                  color: task.isChecked
                    ? theme.colors.onSurfaceDisabled
                    : theme.colors.primary,
                },
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
          )}
          <Menu
            visible={menuVisible}
            anchorPosition="bottom"
            onDismiss={() => setMenuvisible(false)}
            anchor={<View style={{ height: 1, width: 1 }} />}
          >
            <Menu.Item
              leadingIcon="pencil"
              onPress={handleEditButton}
              title="Edit"
            />
            <Menu.Item
              leadingIcon="delete"
              onPress={() => {
                setMenuvisible(false);
                del(task);
              }}
              title="Delete"
            />
          </Menu>
          {/* {!canEdit && (
            <TouchableRipple
              style={{ padding: 0 }}
              onPress={() =>
                navigation.navigate("subtask", { taskId: task.id })
              }
            >
              <Icon size={24} source="chevron-right" />
            </TouchableRipple>
          )} */}
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

export default CategoryTask;
