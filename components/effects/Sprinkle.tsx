'use client';
import React, { useEffect, createRef } from 'react';
import styles from '../../styles/sprinkle.module.scss';

interface SprinkleProps {
    t1?: string;
    t2?: string;
    className?: string;
    starCount?: number;
    starColor?: string;
    randomness?: number;
    opacity?: number;
    children?: React.ReactNode;
}

export default function Sprinkle({ t1, t2, className, starCount, starColor = 'green', randomness = 100, opacity = 1, children }: SprinkleProps) {
    const starRefs = Array.from({ length: starCount }, () => createRef<HTMLSpanElement>());

    useEffect(() => {
        const randomizePosition = (element: { style: { setProperty: (arg0: string, arg1: string) => void } }) => {
            const randomTop = Math.random() * randomness;
            const randomLeft = Math.random() * randomness;

            element.style.setProperty('--star-top', `${randomTop}%`);
            element.style.setProperty('--star-left', `${randomLeft}%`);
        };

        const randomizeSize = (element: { style: { setProperty: (arg0: string, arg1: string) => void } }) => {
            const randomSize = Math.random() * 10 + 5; // Random size between 5 and 15
            element.style.setProperty('--star-size', `${randomSize}px`);
        };

        const handleAnimationIteration = (e: { target: any }) => {
            randomizePosition(e.target);
            randomizeSize(e.target);
        };

        starRefs.forEach((starRef, index) => {
            starRef.current?.addEventListener('animationiteration', handleAnimationIteration);
            starRef.current?.style.setProperty('animation-delay', `${0.2 * index}s`);
        });

        return () => {
            starRefs.forEach((starRef) => {
                starRef.current?.removeEventListener('animationiteration', handleAnimationIteration);
            });
        };
    }, [starRefs, randomness]);

    return (
        <div className={`${className} text-cream`} style={{ position: 'relative', zIndex: 1 }}>
            {t1}
            <span className={styles.magic}>
                {children}
                {Array.from({ length: starCount }).map((_, index) => (
                    <span className={styles['magic-star']} ref={starRefs[index]}>
                        <svg fill={starColor} viewBox="0 0 512 512" style={{ opacity: opacity, position: 'relative', zIndex: -1 }}>
                            <path fill={starColor} d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                        </svg>
                    </span>
                ))}
                <span className={styles['magic-text']} style={{ position: 'relative', zIndex: 2, opacity }}>{t2}</span>
            </span>
        </div>
    );
}
/**
 * ## Usage
 *
 * import Sprinkle from './path-to-Sprinkle'; // replace with actual path
 *
 * function MyComponent() {
 *     return (
 *         <Sprinkle t1="Hello" t2="World" starCount={10} starColor="blue" randomness={50}>
 *             <p>This is a child component</p>
 *         </Sprinkle>
 *     );
 * }
 *
 * or
 *
 * function AnotherComponent({ children }: { children: React.ReactNode }) {
 *     return (
 *         <Sprinkle t1="Welcome" t2="to the party" starCount={5} starColor="yellow" randomness={80}>
 *             {children}
 *         </Sprinkle>
 *     );
 * }
 * ```
 */
