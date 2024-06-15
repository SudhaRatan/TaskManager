import {
  Timestamp,
  addDoc,
  and,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useDatabaseStore } from "../Stores/databaseStore";

const db = useDatabaseStore.getState().database;

// Ai functions

export async function createTaskAI(data) {
  console.log(data);
  const date = new Date();
  const res = await addDoc(collection(db, "tasks"), {
    ...data,
    isChecked: false,
    createdOn: Timestamp.fromDate(date),
  });
}

export async function createTasksAI(tasks) {
  for (var task of tasks) {
    var subtasks;
    if (task.subtasks) {
      subtasks = task.subtasks;
      delete task.subtasks;
    }
    const date = new Date();
    const t = await addDoc(collection(db, "tasks"), {
      ...task,
      isChecked: false,
      createdOn: Timestamp.fromDate(date),
    });
    for (const subtask of subtasks) {
      await createSubTask({
        selectedTaskId: t.id,
        subtaskTitle: subtask.title,
      });
    }
  }
}

export async function createCategoriesAI({ categories, userId }) {
  for (var category of categories) {
    var c = await createCategory({ categoryTitle: category.title, userId });
    category.tasks = category.tasks.map((i) => ({ ...i, category_id: c.id }));
    createTasksAI(category.tasks);
  }
}

// Ui functions

export async function createTask({ taskTitle, selectedCategory, uid }) {
  if (taskTitle != "" && selectedCategory) {
    const date = new Date();
    await addDoc(collection(db, "tasks"), {
      title: taskTitle,
      category_id: selectedCategory,
      uid,
      isChecked: false,
      createdOn: Timestamp.fromDate(date),
    });
  }
}

export async function upadateTasktitle({ taskId, title }) {
  if (title !== "") {
    await updateDoc(doc(db, "tasks", taskId), {
      title,
    });
  }
}

export async function createCategory({ categoryTitle, userId }) {
  if (categoryTitle != "" && userId) {
    const date = new Date();
    const category = await addDoc(collection(db, "categories"), {
      uid: userId,
      title: categoryTitle,
      createdOn: Timestamp.fromDate(date),
    });
    return category;
  }
}

export async function updateCategory({ categoryId, title, userId }) {
  if (title !== "" && userId && categoryId) {
    const res = await updateDoc(doc(db, "categories", categoryId), {
      title: title,
    });
    return res;
  }
}

export async function deleteCategory({ categoryId }) {
  if (categoryId) {
    const res = await getDocs(
      query(collection(db, "tasks"), where("category_id", "==", categoryId))
    );
    const batch = writeBatch(db);
    res.docs.forEach((d) => {
      batch.delete(doc(db, "tasks", d.id));
    });
    await batch.commit();
    await deleteDoc(doc(db, "categories", categoryId));
  }
}

export async function createSubTask({ selectedTaskId, subtaskTitle }) {
  const date = new Date();
  await addDoc(collection(db, "tasks", selectedTaskId, "subtasks"), {
    title: subtaskTitle,
    isChecked: false,
    createdOn: Timestamp.fromDate(date),
  });
}
export function checkSubTask({ taskId, subtask }) {
  updateDoc(doc(db, "tasks", taskId, "subtasks", subtask.id), {
    isChecked: !subtask.isChecked,
  });
}

export function updateTaskdescription({ selectedTaskId, taskDescription }) {
  updateDoc(doc(db, "tasks", selectedTaskId), {
    description: taskDescription,
  });
}

export async function setTaskReminder({ taskId, reminder }) {
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      reminder: Timestamp.fromDate(new Date(reminder)),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function removeTaskReminder({taskId}){
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      reminder: deleteField(),
    });
  } catch (error) {
    console.error(error);
  }
}

export function deleteSubTask({ taskId, subtaskId }) {
  deleteDoc(doc(db, "tasks", taskId, "subtasks", subtaskId));
}

export function createSubTasks() {}

export function getCategories({ user, setCategories }) {
  try {
    onSnapshot(
      query(
        collection(db, "categories"),
        where("uid", "==", user.uid),
        orderBy("createdOn", "desc")
      ),
      (snapShot) => {
        setCategories(
          snapShot.docs.map((data) => ({ id: data.id, ...data.data() }))
        );
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export function getTasks({ categoryId, setTasks, uid }) {
  onSnapshot(
    query(
      collection(db, "tasks"),
      and(where("category_id", "==", categoryId), where("uid", "==", uid)),
      orderBy("createdOn", "asc")
    ),
    (snapShot) => {
      setTasks(snapShot.docs.map((data) => ({ id: data.id, ...data.data() })));
    }
  );
}

export async function getTaskDetails({ taskId, setTask, setSubtasks }) {
  onSnapshot(doc(db, "tasks", taskId), (snapShot) => {
    setTask({ id: snapShot.id, ...snapShot.data() });
  });
  getSubTasks({ taskId, setSubtasks });
}

export function checkTask({ task }) {
  updateDoc(doc(db, "tasks", task.id), {
    isChecked: !task.isChecked,
  });
}

export async function deleteTask({ taskId }) {
  const subtasks = await getDocs(collection(db, "tasks", taskId, "subtasks"));
  const batch = writeBatch(db);
  subtasks.docs.forEach((subtask) => {
    batch.delete(doc(db, "tasks", taskId, "subtasks", subtask.id));
  });
  await batch.commit();
  await deleteDoc(doc(db, "tasks", taskId));
}

export function getSubTasks({ taskId, setSubtasks }) {
  onSnapshot(
    query(
      collection(db, "tasks", taskId, "subtasks"),
      orderBy("createdOn", "asc")
    ),
    (doc) => {
      setSubtasks(doc.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
  );
}
