'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import MobileEffectNav from './Nav';
import EffectMenuButton from './Button/EffectMenuButton';
import Button from './Button/EffectMenuButton';

const menu = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
};

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
                    {isActive && <MobileEffectNav setIsActive={setIsActive} />}
                </AnimatePresence>
            </motion.div>
            <EffectMenuButton isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
        </div>
    );
}