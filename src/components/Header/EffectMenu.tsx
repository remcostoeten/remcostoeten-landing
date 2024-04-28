"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./style.module.scss";
import Nav from "./Nav/EffectNavigation";

type ButtonProps = {
    isActive: boolean;
    toggleMenu: () => void;
};

export const Button: React.FC<
    ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ isActive, toggleMenu }) => {
    return (
        <button
            className={`button ${isActive ? "active absolute top-4 right-4" : ""}`}
            onClick={toggleMenu}
        >
            {isActive ? "Close" : "Menu"}
        </button>
    );
};

const getMenuStyles = () => {
    if (typeof window !== 'undefined') {
        return {
            width: window.innerWidth <= 768 ? "100%" : "480px",
            height: window.innerWidth <= 768 ? "100%" : "650px",
            top: window.innerWidth <= 768 ? "0px" : "-25px",
            right: window.innerWidth <= 768 ? "0px" : "-25px",
        };
    } else {
        // Default styles for server-side rendering
        return {
            width: "100px",
            height: "40px",
            top: "0px",
            right: "0px",
        };
    }
};

const menu = {
    open: {
        ...getMenuStyles(),
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
        ...getMenuStyles(),
        transition: {
            duration: 0.75,
            delay: 0.35,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
        },
    },
};

export default function EffectMenu() {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={styles.header}>
            <motion.div
                className={styles.menu}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Nav setIsActive={setIsActive} />}
                </AnimatePresence>{" "}
                <Button isActive={isActive} toggleMenu={toggleMenu} />
            </motion.div>
        </div>
    );
}
