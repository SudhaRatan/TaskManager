import { useDatabaseStore } from "../Stores/databaseStore";

const database = useDatabaseStore.getState().database;
// const subTaskCollection = database.get("subtasks");

export async function AddSubTask({ title, taskId }) {
  // return new Promise(async (resolve, reject) => {
  //   await database.write(async () => {
  //     const newSubTask = await subTaskCollection.create((st) => {
  //       st.title = title;
  //       st.isChecked = false;
  //       st._setRaw("task_id", taskId);
  //     });
  //     resolve(newSubTask);
  //   });
  // });
}