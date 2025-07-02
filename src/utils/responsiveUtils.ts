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

// 响应式尺寸对象（简化版）
type ResponsiveSize = {
    width: number;
    height: number;
}

// 当前设备类型（用于SSR/默认值）
let currentDeviceType: DeviceType = DeviceType.DESKTOP;

// 判断设备类型（核心函数）
export function getDeviceType(width: number): DeviceType {
    if (width < Breakpoints.md) {
        return DeviceType.MOBILE;
    } else if (width < Breakpoints.lg) {
        return DeviceType.TABLET;
    }
    return DeviceType.DESKTOP;
}

// 在浏览器环境中更新设备类型
if (typeof window !== 'undefined') {
    // 设置初始值
    currentDeviceType = getDeviceType(window.innerWidth);

    // 窗口大小变化时更新
    window.addEventListener('resize', () => {
        currentDeviceType = getDeviceType(window.innerWidth);
    });
}

// 获取设备类型（适用于SSR和CSR）
export function deviceType(): DeviceType {
    return currentDeviceType;
}

// 判断是否为移动设备
export function isMobile(): boolean {
    return deviceType() === DeviceType.MOBILE;
}


export function notMobile(): boolean{
    return !isMobile() && !isTablet()
}

// 判断是否为平板设备
export function isTablet(): boolean {
    return deviceType() === DeviceType.TABLET;
}

// 判断是否为桌面设备
export function isDesktop(): boolean {
    return deviceType() === DeviceType.DESKTOP;
}

// 获取当前窗口尺寸
export function getWindowSize(): ResponsiveSize {
    if (typeof window === 'undefined') {
        return { width: 0, height: 0 };
    }
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

// 响应式Hook（用于React组件）
export function useResponsive() {
    const [device, setDevice] = React.useState<DeviceType>(deviceType());
    const [windowSize, setWindowSize] = React.useState<ResponsiveSize>(getWindowSize());

    React.useEffect(() => {
        // 仅在浏览器环境中执行
        if (typeof window === 'undefined') return;

        // 初始值设置
        setDevice(getDeviceType(window.innerWidth));
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // 窗口大小变化处理器
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setDevice(getDeviceType(newWidth));
            setWindowSize({
                width: newWidth,
                height: window.innerHeight
            });
        };

        // 添加监听器
        window.addEventListener('resize', handleResize);

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        device,
        isMobile: device === DeviceType.MOBILE,
        isTablet: device === DeviceType.TABLET,
        isDesktop: device === DeviceType.DESKTOP,
        windowSize,
        breakpoints: Breakpoints
    };
}
