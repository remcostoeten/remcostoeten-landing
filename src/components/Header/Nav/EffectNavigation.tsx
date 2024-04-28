'use client '

import styles from './style.module.scss';
import { perspective, slideIn } from "./effectAnimations";
import { useRef } from 'react';
import SocialBadge from '@/components/ui/social-badge';
import { contactInfo } from '@/core/config/personal-info';
import { navigationMenuItems } from '@/core/config/menu';
import Link from 'next/link';
import useOnClickOutside from '@/core/hooks/useClickOutside';
import { motion, useCycle } from 'framer-motion';
import { Icons } from '@/components/icons';

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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            cycleAnimation();
                                            setIsActive(false);
                                        }}
                                    >
                                        <Link href={href}>{label}</Link>
                                    </motion.div>
                                </div>
                            );
                        })
                    }
                </div>
                <motion.div>
                    <SocialBadge
                        link={contactInfo.email?.includes('@') ? `mailto:${contactInfo.email}` : contactInfo.email}
                        external
                    >
                        <Icons.mail width={16} className="mr-2" />
                        {contactInfo.email}
                    </SocialBadge>
                </motion.div>
                <motion.div>
                    <SocialBadge link={contactInfo.github} external>
                        <Icons.github width={16} className="mr-2" />
                        {contactInfo.handle}
                    </SocialBadge>
                </motion.div>
                <motion.div>
                    <SocialBadge link={contactInfo.linkedinhandle} external>
                        <Icons.linkedin width={16} className="mr-4" />
                        <span className="ml-2">{contactInfo.linkedinhandle}</span>
                    </SocialBadge>
                </motion.div>
            </div >
        </motion.div >
    )
}