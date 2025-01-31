export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  subtasks?: Task[];
  parentId?: string;
}
