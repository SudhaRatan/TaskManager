import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../App";

// Ai functions

export async function createTaskAI(data) {
  console.log(data);
  const date = new Date();
  const res = await addDoc(collection(db, "tasks"), {
    ...data,
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

export function createTask({ taskTitle, selectedCategory }) {
  if (taskTitle != "" && selectedCategory) {
    const date = new Date();
    addDoc(collection(db, "tasks"), {
      title: taskTitle,
      category_id: selectedCategory,
      createdOn: Timestamp.fromDate(date),
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

export async function createSubTask({ selectedTaskId, subtaskTitle }) {
  const date = new Date();
  await addDoc(collection(db, "tasks", selectedTaskId, "subtasks"), {
    title: subtaskTitle,
    createdOn: Timestamp.fromDate(date),
  });
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

export function updateTaskdescription({ selectedTaskId, taskDescription }) {
  setDoc(
    doc(db, "tasks", selectedTaskId),
    {
      description: taskDescription,
    },
    { merge: true }
  );
}

export function getTasks({ categoryId, setTasks }) {
  onSnapshot(
    query(
      collection(db, "tasks"),
      where("category_id", "==", categoryId),
      orderBy("createdOn", "asc")
    ),
    (snapShot) => {
      setTasks(snapShot.docs.map((data) => ({ id: data.id, ...data.data() })));
    }
  );
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
