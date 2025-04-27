import { Task } from "@/types";
import { create } from "zustand";

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  removeTask: (id: string) => void;
  setTasksList: (tasks: Task[]) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasksList: (tasks: Task[]) =>
    set((state) => {
      const sortedTasks = tasks.sort((a, b) => {
        return a.dateCreated > b.dateCreated ? -1 : 1;
      });
      return {
        tasks: sortedTasks,
      };
    }),
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
