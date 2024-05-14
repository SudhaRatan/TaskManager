import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import { useState } from "react";
import { addCategory, updateCategory } from "../DL/CategoriesDL";
import { useCategoryStore } from "../Stores/categoryStore";
import { runOnJS } from "react-native-reanimated";

const AddCategory = ({ visible, hideDialog, update, closeMenu, category }) => {
  const [title, setTitle] = useState(update ? category.title : "");

  const setCategory = useCategoryStore((state) => state.setCategory);

  const Add = async () => {
    if (title !== "") {
      if (update) {
        setCategory({ title: "Updating title..." });
        updateCategory(category, title).then((updatedCategory) => {
          setCategory(updatedCategory);
          hideDialog();
          setTitle("");
          closeMenu && closeMenu();
        });
      } else {
        addCategory(title).then((newCategory) => {
          hideDialog();
          setTitle("");
        });
      }
    }
  };
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
        <Dialog.Title>{update ? "Update" : "Add"} Category</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoFocus={visible}
            value={title}
            onChangeText={setTitle}
            label="Category"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              closeMenu && closeMenu();
              hideDialog();
            }}
          >
            Cancel
          </Button>
          <Button onPress={Add}>{update ? "Update": "Add"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default AddCategory;
