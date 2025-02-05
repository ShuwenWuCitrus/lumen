export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  parentId?: string;
  steps: string[]; // 存储任务的完整执行步骤
  currentStepIndex: number; // 当前执行到的步骤索引
  estimatedTimes?: number[]; // 每个步骤的预估时间
  skippedSteps?: number[]; // 被跳过的步骤索引
  completedSteps?: number[]; // 已完成的步骤索引
  completedAt?: string;
}
