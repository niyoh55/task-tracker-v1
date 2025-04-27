export type Task = {
  id: string;
  title: string;
  // description: string;
  completed: boolean;
  date: Date | string | undefined;
  priority: number;
  dateCreated: Date | string;
};
