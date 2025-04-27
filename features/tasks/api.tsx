import { Task } from "@/types";
import firestore from "@react-native-firebase/firestore";

export const fetchTasks = async () => {
  const tasks = await firestore().collection("tasks").get();
  const tasksList: Task[] = tasks.docs.map((doc) => {
    const data = doc.data();
    console.log({ qwe123: data });
    return {
      id: doc.id,
      title: data.title || "",
      completed: data.completed || false,
      date: (data?.date && new Date(data?.date?.seconds * 1000)) || null,
      priority: data.priority || 0,
      dateCreated: data?.dateCreated,
    };
  });
  console.log({ tasksList });
  return tasksList;
};

export const addTask = async (
  { title, priority, date, completed }: Omit<Task, "id" | "dateCreated">,
  cb: () => void
) => {
  await firestore()
    .collection("tasks")
    .add({
      title: title,
      completed: completed,
      date: date ?? null,
      priority: priority,
      dateCreated: new Date() || "now",
    })
    .then((data) => {
      console.log("Task added!");
      console.log({ addedTask: data });
      if (cb) {
        cb();
      }
    })
    .catch((error) => {
      console.log("Error adding task: ", error);
    });
};

export const deleteTask = async (taskId: string) => {
  try {
    await firestore().collection("tasks").doc(taskId).delete();
    console.log(`Task with ID ${taskId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const updateTask = async (
  taskId: string,
  updatedFields: Partial<{ title: string; completed: boolean }>
) => {
  try {
    await firestore().collection("tasks").doc(taskId).update(updatedFields);
    console.log(`Task with ID ${taskId} updated successfully.`);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};
