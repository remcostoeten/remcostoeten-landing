import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Nav from "../effects/_Nav";
import styles from "./style.module.scss";

const menu = {
    open: {
        width: (width) => (width <= 768 ? "100%" : "480px"),
        height: (width) => (width <= 768 ? "100%" : "650px"),
        top: (width) => (width <= 768 ? "0px" : "-25px"),
        right: (width) => (width <= 768 ? "0px" : "-25px"),
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: {
            duration: 0.75,
            delay: 0.35,
            type: "tween",
            ease: [0.76, 0, 0.24, 1],
        },
    },
};

interface ButtonProps {
    isActive: boolean;
    toggleMenu: () => void;
}
export const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    isActive,
    toggleMenu,
}) => {
    return (
        <button
            className={`button ${isActive ? "active" : ""}`}
            onClick={toggleMenu}
        >
            {isActive ? "Close" : "Open"}
        </button>
    );
};

export default function EffectMenu() {
    const [isActive, setIsActive] = useState(false);
    const [menuWidth, setMenuWidth] = useState(480);
    useEffect(() => {
        const handleResize = () => {
            setMenuWidth(window.innerWidth <= 768 ? "100%" : "480px");
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove event listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const finalMenu = { ...menu.open, width: menuWidth };

    return (
        <div className={styles.header}>
            <motion.div
                className={styles.menu}
                variants={finalMenu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>{isActive && <Nav setIsActive={isActive} />}</AnimatePresence>
            </motion.div>
            <Button
                isActive={isActive}
                toggleMenu={() => {
                    setIsActive(!isActive);
                }}
            />
        </div>
    );
}
