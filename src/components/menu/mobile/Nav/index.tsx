import styles from './style.module.scss';
import { m } from 'framer-motion';
import { perspective } from '@/core/lib/animations/nav-animations';
import { slideIn } from '@/components/effects/mobile-nav-animation';
import { navigationMenuItems, footerLinks } from '@/core/config/menu';

export default function index() {
    return (
        <div className={styles.nav}>
            <div className={styles.body}>
                {
                    navigationMenuItems.filter(item => item.isMobile).map((link, i) => {
                        const { title, href } = link;
                        return (
                            <div key={`b_${i}`} className={styles.linkContainer}>
                                <m.a
                                    href={href}
                                    custom={i}
                                    variants={perspective}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                >
                                    {title}
                                </m.a>
                            </div>
                        )
                    })
                }
            </div>
            <m.div className={styles.footer}>
                {
                    footerLinks.map((link, i) => {
                        const { title, href } = link;
                        return (
                            <m.a
                                variants={slideIn}
                                custom={i}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                                key={`f_${i}`}
                            >
                                {title}
                            </m.a>
                        )
                    })
                }
            </m.div>
        </div>
    )
}