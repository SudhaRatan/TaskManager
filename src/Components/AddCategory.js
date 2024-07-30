import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import { useState } from "react";
import { useCategoryStore } from "../Stores/categoryStore";
import { createCategory, updateCategory } from "../DL/firebaseFunctions";

const AddCategory = ({
  visible,
  hideDialog,
  update,
  closeMenu,
  category,
  user,
}) => {
  const [title, setTitle] = useState(update ? category.title : "");

  const setCategory = useCategoryStore((state) => state.setCategory);

  const Add = async () => {
    if (title !== "") {
      if (update) {
        setCategory({ ...category, title: "Updating title..." });
        await updateCategory({
          categoryId: category.id,
          title: title,
          userId: user.uid,
        });
        setCategory({ ...category, title: title });
        hideDialog();
        setTitle("");
        closeMenu && closeMenu();
      } else {
        createCategory({ categoryTitle: title, userId: user.uid });
        hideDialog();
        setTitle("");
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
          <Button onPress={Add}>{update ? "Update" : "Add"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default AddCategory;
