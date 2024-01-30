'use client';
import { useEffect, useRef } from 'react';

export default function BackgroundGradientEffect({ zIndex = 0 }) {
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!gradientRef.current) return;

            const { clientX, clientY, screenX, screenY } = event;
            const x = (clientX / window.innerWidth) * 100;
            const y = (clientY / window.innerHeight) * 100;

            gradientRef.current.style.backgroundImage = `radial-gradient(at ${x}% ${y}%, #B945CC, #355BE0)`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="BackgroundGradientEffect pointer-events-none h-[100vh] fixed inset-0 mx-0 max-w-none rotate-180 overflow-hidden" style={{ zIndex }}>
            <div className="absolute left-1/3 top-0 ml-[-30rem] h-[30rem] w-[120rem] [mask-image:linear-gradient(white,transparent)]">
                <div ref={gradientRef} className="absolute inset-0 bg-gradient-to-r from-[#B945CC]/70 to-[#355BE0]/70 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]"></div>
            </div>
        </div>
    );
}