import { ReactNode } from "react";

export interface NavItem {
    title?: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: any;
}

export type MenuItemProps = {
    title: string;
    href: string;
    icon: JSX.Element;
    isShow?: boolean;
    isExternal: boolean;
    onClick?: () => void;
    className?: string;
    children?: ReactNode;
    eventName?: string;
    hideIcon?: boolean;
    type?: string;
};

export type MenuState = {
    width: string;
    height: string;
    top: string;
    right: string;
    transition: {
        duration: number;
        delay?: number;
        type: string;
        ease: number[];
    };
}