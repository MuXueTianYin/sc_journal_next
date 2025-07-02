// lib/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * 自定义防抖 Hook
 * @param value 需要防抖的值
 * @param delay 防抖延迟时间（毫秒），默认 300ms
 * @returns 防抖处理后的值
 */
function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // 设置定时器，在延迟后更新值
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // 清除定时器（当值变化或组件卸载时）
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
