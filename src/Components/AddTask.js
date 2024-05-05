import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  DefaultTheme,
  Menu,
} from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { getCategories } from "../DL/CategoriesDL";
import { EnhancedCategoriesDropdown } from "../Observables/EnhancedCategories";
import { useCategoryStore } from "../Stores/categoryStore";
import { addTask } from "../DL/TasksDL";

const AddTask = ({ visible, hideDialog }) => {
  const [title, setTitle] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);
  const category = useCategoryStore((state) => state.category);

  const Add = async () => {
    if (title !== "" && category !== null) {
      addTask({ title, categoryId: category.id }).then((newTask) => {
        console.log(newTask);
        hideDialog();
        setTitle("");
      });
    }
  };

  const openMenu = () => setVisible1(true);
  const closeMenu = () => setVisible1(false);

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
        <Dialog.Title>Add Task</Dialog.Title>
        <Dialog.Content>
          <View style={{ gap: 10 }}>
            <Text>Select Category</Text>
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
              {category ? category.title : "Select Category"}
            </Text>
          </View>
          <Menu
            visible={visible1}
            style={{ width: menuWidth }}
            onDismiss={closeMenu}
            anchor={<View style={{ height: 10 }} />}
          >
            <EnhancedCategoriesDropdown
              closeMenu={closeMenu}
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
export default AddTask;
