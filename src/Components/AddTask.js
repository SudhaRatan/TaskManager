import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  DefaultTheme,
  Menu,
  Divider,
} from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import { useState } from "react";
import { useDatabaseStore } from "../Stores/databaseStore";
import { StyleSheet, View } from "react-native";

const AddTask = ({ visible, hideDialog }) => {
  const [title, setTitle] = useState("");
  const database = useDatabaseStore((state) => state.database);
  const Add = async () => {
    if (title !== "") {
      await database.write(async () => {
        // const newCategory = await database
        //   .get("tasks")
        //   .create((task) => {
        //     task.title = title;
        //     task.category = title;
        //   });
        // console.log(newCategory);
        // hideDialog();
        // setTitle("");
      });
    }
  };

  const [visible1, setVisible1] = useState(false);
  const openMenu = () => setVisible1(true);
  const closeMenu = () => setVisible1(false);

  const [menuWidth, setMenuWidth] = useState(0);

  return (
    <Portal>
      <Dialog
        style={{
          width: useBreakPoint("90%", "70%", "45%"),
          alignSelf: "center",
        }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title>Add Category</Dialog.Title>
        <Dialog.Content>
          <Text
            onPress={openMenu}
            style={{
              padding: 20,
              backgroundColor: DefaultTheme.colors.surfaceVariant,
            }}
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }) => {
              setMenuWidth(width);
            }}
          >
            Select Category
          </Text>
          <Menu
            visible={visible1}
            style={{ width: menuWidth }}
            onDismiss={closeMenu}
            anchor={<View style={{ height: 10 }} />}
          >
            <Menu.Item
              onPress={() => {}}
              style={style.menuItem}
              title="Item 1"
            />
            <Menu.Item
              onPress={() => {}}
              style={style.menuItem}
              title="Item 2"
            />
            <Menu.Item
              onPress={() => {}}
              style={style.menuItem}
              title="Item 3"
            />
          </Menu>

          <TextInput value={title} onChangeText={setTitle} label="Task" />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={Add}>Add</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
const style = StyleSheet.create({
  menuItem: { minWidth: "100%" },
});
export default AddTask;
