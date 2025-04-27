import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import useTaskStore from "@/features/tasks/store";
import { Task } from "@/types";

export const useRealTimeTasks = () => {
  const setTasksList = useTaskStore((state) => state.setTasksList);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("tasks")
      .onSnapshot((snapshot: any) => {
        console.log({ snapshot });
        const tasks: Task[] = snapshot.docs.map((data: any) => {
          const {
            title,
            completed,
            date = null,
            priority,
            dateCreated,
          } = data._data;
          return {
            id: data.id,
            title: title || "",
            completed: completed || false,
            date: (date && new Date(date?.seconds * 1000)) || null,
            priority: priority || 0,
            dateCreated: dateCreated,
          };
        });
        console.log({ tasks000: tasks });
        setTasksList(tasks);
      });

    return () => unsubscribe();
  }, [setTasksList]);
};
