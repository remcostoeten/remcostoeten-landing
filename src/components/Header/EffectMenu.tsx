import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./style.module.scss";
import MobileEffectNav from "./Nav/EffectNavigation";

type ButtonProps = {
    isActive: boolean;
    toggleMenu: () => void;
};

const navVariants = {
    open: { opacity: 1, transition: { duration: 0.5 } },
    closed: { opacity: 0 },
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

export default function EffectMenu() {
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef(null);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isActive) {
            menuRef.current.focus();
        }
    }, [isActive]);

    const menu = {
        open: {
            width: windowSize.width <= 768 ? "100%" : "480px",
            height: windowSize.width <= 768 ? "100%" : "650px",
            top: windowSize.width <= 768 ? "0px" : "-25px",
            right: windowSize.width <= 768 ? "0px" : "-25px",
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

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="sm:hidden">
            <div className={styles.header}>
                <motion.div
                    className={styles.menu}
                    variants={menu}
                    animate={isActive ? "open" : "closed"}
                    initial="closed"
                    ref={menuRef}
                    tabIndex={-1}
                >
                    <AnimatePresence>
                        {isActive && <MobileEffectNav setIsActive={setIsActive} />}
                    </AnimatePresence>{" "}
                    <Button isActive={isActive} toggleMenu={toggleMenu} />
                </motion.div>
            </div>
        </div>
    );
}