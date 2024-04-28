'use client';
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button/EffectNavigationButton';
import styles from './style.module.scss';
import Nav from './Nav/EffectNavigation';

const menu = {
    open: {
        width: window.innerWidth <= 768 ? "100%" : "480px",
        height: window.innerWidth <= 768 ? "100%" : "650px",
        top: window.innerWidth <= 768 ? "0px" : "-25px",
        right: window.innerWidth <= 768 ? "0px" : "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
    }
}

export default function EffectMenu() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.header}>
            <motion.div
                className={styles.menu}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Nav />}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/>
        </div>
    )
}
