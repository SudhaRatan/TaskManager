import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  Menu,
  useTheme,
} from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import { useState } from "react";
import { View } from "react-native";
import { CategoriesDropdown } from "../Observables/EnhancedCategories";
import { useCategoryStore } from "../Stores/categoryStore";
import { createTask } from "../DL/firebaseFunctions";

const AddTask = ({ visible, hideDialog, user }) => {
  const [title, setTitle] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);
  const category = useCategoryStore((state) => state.category);
  const categories = useCategoryStore((state) => state.categories);

  const Add = async () => {
    if (title !== "" && category !== null) {
      createTask({
        taskTitle: title,
        selectedCategory: category.id,
        uid: user.uid,
      });
      hideDialog();
      setTitle("");
    }
  };

  const theme = useTheme();

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
                backgroundColor: theme.colors.secondaryContainer,
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
            <CategoriesDropdown
              user={user}
              categories={categories}
              closeMenu={closeMenu}
            />
          </Menu>

          <TextInput
            value={title}
            onChangeText={setTitle}
            label="Task"
            autoFocus={category ? true : false}
          />
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
