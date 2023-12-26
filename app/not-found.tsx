'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { AnimatedElement } from '@/components/effects/AnimatedElement';
import Link from 'next/link';

const NotFound = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        console.log('Searching for:', query);
    };

    useEffect(() => {
        document.body.classList.add('error-page');
    }, []);

    return (
        <AnimatedElement
            initialOpacity={0}
            duration={0.5}
            delay={0}
            className="error-contained mb-24 mr-3 mt-32 max-md:mx-auto max-md:my-10 max-md:mr-2.5 max-md:max-w-full"
        >
            <div className="flex items-center justify-between gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
                <AnimatedElement
                    initialOpacity={0}
                    duration={0.2}
                    className="flex flex-col items-stretch max-md:ml-0 max-md:w-full"
                >
                    <AnimatedElement initialOpacity={0} duration={0.6} delay={0.2} className="flex grow flex-col items-stretch pr-8 max-md:mx-auto max-md:mt-10 max-md:max-w-full max-md:pr-5">
                        <div className="text-base font-semibold leading-6 text-neutral-300 max-md:max-w-full">404 error</div>
                        <AnimatedElement initialOpacity={0} duration={0.4} delay={0.4} className="mt-3 text-6xl font-semibold leading-[72px] tracking-tighter text-neutral-100 max-md:max-w-full max-md:text-4xl">Under maintenance</AnimatedElement>
                        <AnimatedElement initialOpacity={0} duration={0.6} delay={0.6} className="mt-6 max-w-[480px] text-xl leading-8 text-neutral-400 max-md:max-w-full">
                            Sorry, the page you are looking for doesn&apos;t exist or has been moved. Try searching our site or go back to{' '}
                            <Link href="/" className="underline">home</Link>
                        </AnimatedElement>{" "}
                        <div className="mt-12 flex items-stretch justify-between gap-4 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
                            <AnimatedElement initialOpacity={0} duration={0.8} delay={0.65}>
                                <Input showSearchContent onSearch={handleSearch} />
                            </AnimatedElement>
                            <AnimatedElement initialOpacity={0} duration={0.8} delay={0.7}>
                                <button className="items-stretch justify-center whitespace-nowrap rounded-lg border border-solid bg-violet-500 px-5 py-3 text-base font-semibold leading-6 text-white shadow-sm">
                                    Search
                                </button>
                            </AnimatedElement>
                        </div>
                    </AnimatedElement>
                </AnimatedElement>
                <AnimatedElement initialOpacity={0} duration={0.5} delay={0.5} x={15} className="error-svg ml-5 flex w-[46%] flex-col items-stretch max-md:mx-auto max-md:ml-0 max-md:w-full">
                    <Icons.errorpage />
                </AnimatedElement>
            </div >
        </AnimatedElement >
    );
};

export default NotFound;