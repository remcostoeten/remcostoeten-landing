'use client'
import { motion, HTMLMotionProps } from 'framer-motion';
import { BEZIER_CURVES, BezierCurve } from '@/core/lib/bezier-curves';

interface AnimatedElementProps extends HTMLMotionProps<'div'> {
    initialOpacity?: number;
    duration?: number;
    delay?: number;
    ease?: keyof typeof BEZIER_CURVES | BezierCurve;
    x?: number;
    y?: number;
    scale?: number;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
    initialOpacity = 0,
    duration = 0.5,
    delay = 0,
    ease = 'EASE_IN',
    x = 0,
    y = 0,
    scale = 1,
    className,
    children,
    ...restProps
}) => {
    const animationProps = {
        initial: { opacity: initialOpacity, x, y, scale },
        animate: {
            opacity: 1,
            x,
            y,
            scale,
            transition: {
                duration,
                delay,
                ease: typeof ease === 'string' ? BEZIER_CURVES[ease] : ease
            }
        },
    };

    return (
        <motion.div {...animationProps} className={className} {...restProps}>
            {children}
        </motion.div>
    );
};