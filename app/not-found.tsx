'use client';
import { useEffect, useState } from 'react';
import { motion as m, useAnimation } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { BEZIER_CURVES } from '@/core/lib/bezier-curves';


const NotFound = () => {
    const controls = useAnimation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = (duration = 0.5, delay: number, startX: number = 0, startY: number = 0, endX: number = 0, endY: number = 0) => ({
        hidden: { opacity: 0, y: startY, x: startX, scale: 0.95 }, // initial position
        visible: {
            opacity: 1,
            x: endX,
            y: endY,
            scale: 1,
            transition: {
                ease: BEZIER_CURVES.EASE_IN_OUT,
                duration: duration,
                delay: delay,
            },
        },
        hover: {
            scale: 1.1,
            rotate: 10,
            transition: {
                yoyo: Infinity,
            },
        },
    });


    useEffect(() => {
        document.body.classList.add('error-page');
        controls.start('visible');
    }, [controls]);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        console.log('Searching for:', query);
    };

    return (
        <m.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="mb-24 mr-3 mt-32 max-md:my-10 max-md:mr-2.5 max-md:max-w-full"
        >
            <div className="flex items-center justify-between gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
                <m.div
                    variants={itemVariants(0)}
                    className="flex flex-col items-stretch max-md:ml-0 max-md:w-full"
                >
                    <m.div variants={itemVariants(0.2)} className="flex grow flex-col items-stretch pr-8 max-md:mt-10 max-md:max-w-full max-md:pr-5">
                        <div className="text-base font-semibold leading-6 text-neutral-300 max-md:max-w-full">404 error</div>
                        <m.div variants={itemVariants(0.4)} className="mt-3 text-6xl font-semibold leading-[72px] tracking-tighter text-neutral-100 max-md:max-w-full max-md:text-4xl">Under maintenance</m.div>
                        <m.div variants={itemVariants(0.6)} className="mt-6 max-w-[480px] text-xl leading-8 text-neutral-400 max-md:max-w-full">Sorry, the page you are looking for doesn&apos;t exist or has been moved. Try searching our site</m.div>{" "}
                        <div className="mt-12 flex items-stretch justify-between gap-4 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
                            <m.div variants={itemVariants(0.8)}>
                                <Input showSearchContent onSearch={handleSearch} />
                            </m.div>
                            <m.div variants={itemVariants(0.8)}>
                                <button className="items-stretch justify-center whitespace-nowrap rounded-lg border border-solid bg-violet-500 px-5 py-3 text-base font-semibold leading-6 text-white shadow-sm">
                                    Search
                                </button>
                            </m.div>
                        </div>
                    </m.div>
                </m.div>
                <m.div variants={itemVariants(0.5, 5, 15, 0, 0)} className="ml-5 flex w-[46%] flex-col items-stretch max-md:ml-0 max-md:w-full">
                    <Icons.errorpage />
                </m.div>
            </div>
        </m.div>
    );
};

export default NotFound;
