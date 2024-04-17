'use client'

import styles from './style.module.scss';
import { motion, useCycle } from 'framer-motion';
import { footerLinks } from './effectDataItems';
import { perspective, slideIn } from "./effectAnimations";
import { navigationMenuItems } from '@/core/config/menu';
import Link from '@/components/core/Link';
import useOnClickOutside from '@/core/hooks/useClickOutside';
import { useRef } from 'react';

export default function MobileEffectNav({ setIsActive }) {
    const [animation, cycleAnimation] = useCycle('enter', 'exit');
    const ref = useRef();
    useOnClickOutside(ref, () => setIsActive(false));

    return (
        <motion.div
            ref={ref}
            variants={slideIn}
            initial="initial"
            animate={animation}
            exit="exit"
        >
            <div className={styles.nav}>
                <div className={styles.body}>
                    {
                        navigationMenuItems.map((link, i) => {
                            const { label, href } = link;
                            return (
                                <div key={`b_${i}`} className={styles.linkContainer}>
                                    <motion.div
                                        custom={i}
                                        variants={perspective}
                                        initial="initial"
                                        animate={animation}
                                        exit="exit"
                                        onClick={() => {
                                            cycleAnimation();
                                            setIsActive(false);
                                        }}
                                    >
                                        <Link href="/">{label}</Link>
                                    </motion.div>
                                </div>
                            )
                        })
                    }
                </div>
                <motion.div className={styles.footer}>
                    {
                        footerLinks.map((link, i) => {
                            const { title, href } = link;
                            return (
                                <motion.a
                                    variants={slideIn}
                                    custom={i}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    key={`f_${i}`}
                                >
                                    {title}
                                </motion.a>
                            )
                        })
                    }
                </motion.div>
            </div>
        </motion.div>
    )
}