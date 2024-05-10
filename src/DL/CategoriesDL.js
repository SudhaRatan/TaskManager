import { useDatabaseStore } from "../Stores/databaseStore";

const database = useDatabaseStore.getState().database;

const categoriesCollection = database.get("categories");

export const getCategories = async () => {
  const categories = await categoriesCollection.query().fetch();
  return categories;
};

export const addCategory = async (title) => {
  return new Promise(async (resolve, reject) => {
    await database.write(async () => {
      const newCategory = await categoriesCollection.create((category) => {
        category.title = title;
      });
      resolve(newCategory);
    });
  });
};