import { useEffect, useRef } from "react";

/**
 * 自定义hook，用于为函数提供节流功能
 * @param fn 需要节流的函数
 * @param delay 节流延迟时间（毫秒）
 * @returns 节流处理后的函数
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const argsRef = useRef<Parameters<T> | null>(null);

  // 清除任何已经存在的timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    argsRef.current = args;

    // 如果是第一次调用或者已经超过了节流时间
    if (now - lastExecuted.current > delay) {
      fn(...args);
      lastExecuted.current = now;
    } else {
      // 否则，清除任何已经存在的timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 创建一个新的timeout，以确保在节流期结束后执行函数
      timeoutRef.current = setTimeout(() => {
        if (argsRef.current) {
          fn(...argsRef.current);
          lastExecuted.current = Date.now();
          timeoutRef.current = null;
        }
      }, delay - (now - lastExecuted.current));
    }
  };
}
