import { useState, useEffect } from "react";

/**
 * 自定义hook，用于为输入值提供防抖功能
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 设置一个在delay后更新debouncedValue的定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 如果value或delay改变，清除前一个定时器
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
