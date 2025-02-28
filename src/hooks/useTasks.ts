import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/taskService";
import { Task } from "@/types/task";

export function useTasks() {
  const queryClient = useQueryClient();

  // 获取所有任务
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getTasks,
  });

  // 创建任务
  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old,
        newTask,
      ]);
    },
  });

  // 更新任务
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) =>
      taskService.updateTask(id, updates),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    },
  });

  // 删除任务
  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.filter((task) => task.id !== deletedId)
      );
    },
  });

  // 分解任务
  const decomposeTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      taskText,
      language,
    }: {
      taskId: string;
      taskText: string;
      language: string;
    }) => taskService.decomposeTask(taskId, taskText, language),
    onSuccess: (data, { taskId }) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === taskId
            ? {
                ...task,
                steps: data.steps.map((s) => s.text),
                estimatedTimes: data.steps.map((s) => s.time),
                currentStepIndex: 0,
                completedSteps: [],
                skippedSteps: [],
              }
            : task
        )
      );
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    decomposeTask: decomposeTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
    isDecomposing: decomposeTaskMutation.isPending,
  };
}
