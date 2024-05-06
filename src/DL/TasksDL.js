import { Q } from "@nozbe/watermelondb";
import { useDatabaseStore } from "../Stores/databaseStore";

const database = useDatabaseStore.getState().database;

const tasksCollection = database.get("tasks");

export const getTasksForCategory = async (categoryId) => {
  const tasks = await tasksCollection
    .query(Q.where("category_id", categoryId))
    .fetch();
  return tasks;
};

export const checkTask = async (task) => {
  await database.write(async () => {
    await task.update(() => {
      task.isChecked = !task.isChecked;
    });
  });
};

export const addTask = ({ title, categoryId }) => {
  return new Promise(async (resolve, reject) => {
    await database.write(async () => {
      const newTask = await tasksCollection.create((task) => {
        task.title = title;
        task.isChecked = false;
        task._setRaw("category_id", categoryId);
      });
      resolve(newTask);
    });
  });
};

export const deleteTask = async (task) => {
  await database.write(async () => {
    await task.destroyPermanently();
    return true;
  });
};
