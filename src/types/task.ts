export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  parentId?: string;
  subtasks?: Task[];
  isFirstStep?: boolean;
  estimatedTime?: number;
  completedAt?: string;
}
