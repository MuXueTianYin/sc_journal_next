// 设备类型枚举
import React from "react";

export enum DeviceType {
    MOBILE = 'mobile',
    TABLET = 'tablet',
    DESKTOP = 'desktop',
}

// Tailwind断点阈值（单位：px）
const Breakpoints = {
    sm: 640,    // 小屏幕 - 移动设备
    md: 768,    // 平板设备
    lg: 1024,   // 大屏幕 - 桌面设备
    xl: 1280,   // 超大屏幕
    '2xl': 1536 // 特大屏幕
};

// 响应式尺寸对象
type ResponsiveSize = {
    width: number;
    height: number;
}

// 判断设备类型（核心函数）
export function getDeviceType(width: number): DeviceType {
    if (width < Breakpoints.md) {
        return DeviceType.MOBILE;
    } else if (width < Breakpoints.lg) {
        return DeviceType.TABLET;
    }
    return DeviceType.DESKTOP;
}

// 响应式Hook（完全客户端渲染）
export function useResponsive() {
    // 使用状态管理设备类型和窗口尺寸
    const [device, setDevice] = React.useState<DeviceType>(DeviceType.DESKTOP);
    const [windowSize, setWindowSize] = React.useState<ResponsiveSize>({
        width: 0,
        height: 0
    });

    // 添加一个标记，表示是否已完成初始测量
    const [isMeasured, setIsMeasured] = React.useState(false);

    React.useEffect(() => {
        // 确保只在客户端执行
        if (typeof window === 'undefined') return;

        // 更新状态的函数
        const updateResponsiveState = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setDevice(getDeviceType(width));
            setWindowSize({ width, height });

            // 标记已完成初始测量
            if (!isMeasured) setIsMeasured(true);
        };

        // 初始设置
        updateResponsiveState();

        // 添加窗口大小变化监听器
        window.addEventListener('resize', updateResponsiveState);

        // 清理函数
        return () => {
            window.removeEventListener('resize', updateResponsiveState);
        };
    }, [isMeasured]); // 仅在 isMeasured 变化时重新创建effect

    // 计算移动端判断
    const isMobile = device === DeviceType.MOBILE;
    const isTablet = device === DeviceType.TABLET;
    const isDesktop = device === DeviceType.DESKTOP;

    return {
        device,
        isMobile,
        isTablet,
        isDesktop,
        windowSize,
        breakpoints: Breakpoints,
        isMeasured // 返回测量状态
    };
}
