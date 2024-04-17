'use client';
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button/HamburgerNavButton';
import styles from './style.module.scss';
import Nav from './Nav';
import { MenuState } from '@/core/types/nav';
import { CircleEffectButton } from '@/components/effects/CircleButton';

const menu: { open: MenuState; closed: MenuState } = {
    open: {
        width: "480px",
        height: "650px",
        top: "-25px",
        right: "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
    }
}

interface ButtonProps {
    isActive: boolean;
    toggleMenu: () => void;
}

const HamburgerMenu: React.FC = () => {
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

            <Button isActive={isActive} toggleMenu={() => { setIsActive(!isActive) }} />
        </div>
    )
}

export default HamburgerMenu;