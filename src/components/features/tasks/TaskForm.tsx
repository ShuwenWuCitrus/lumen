"use client";

import { FormEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

interface TaskFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  remainingTasks: number;
}

export function TaskForm({
  value,
  onChange,
  onSubmit,
  remainingTasks,
}: TaskFormProps) {
  const { t } = useLanguage();

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.tasks.addPlaceholder}
          className="flex-1"
        />
        <Button type="submit">{t.tasks.addButton}</Button>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        {t.tasks.remainingTasks.replace("{count}", String(remainingTasks))}
      </p>
    </form>
  );
}
