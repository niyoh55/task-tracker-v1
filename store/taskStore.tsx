import { Task } from "@/app/(tabs)";
import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  removeTask: (id: string) => void;
  setTasksList: (tasks: Task[]) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasksList: (tasks: Task[]) =>
    set((state) => ({
      tasks: tasks,
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
  toggleTaskCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useTaskStore;
