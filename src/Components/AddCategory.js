import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import { useRef, useState } from "react";
import { useDatabaseStore } from "../Stores/databaseStore";
import { addCategory } from "../DL/CategoriesDL";

const AddCategory = ({ visible, hideDialog }) => {
  const [title, setTitle] = useState("");
  const database = useDatabaseStore((state) => state.database);
  const Add = async () => {
    if (title !== "") {
      await database.write(async () => {
        addCategory(title).then((newCategory) => {
          hideDialog();
          setTitle("");
        });
      });
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
        <Dialog.Title>Add Category</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoFocus={visible}
            value={title}
            onChangeText={setTitle}
            label="Category"
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
export default AddCategory;
