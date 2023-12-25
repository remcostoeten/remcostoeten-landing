'use client';
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from 'react';

const NotFound = () => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        document.body.classList.add('error-page');
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        console.log('Searching for:', query);
    };

    return (
        <div className="mb-24 mr-3 mt-32 max-md:my-10 max-md:mr-2.5 max-md:max-w-full">
            <div className="flex items-center justify-between gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex  flex-col items-stretch max-md:ml-0 max-md:w-full">
                    <div className="flex grow flex-col items-stretch pr-8 max-md:mt-10 max-md:max-w-full max-md:pr-5">
                        <div className="text-base font-semibold leading-6 text-neutral-300 max-md:max-w-full">404 error</div>
                        <div className="mt-3 text-6xl font-semibold leading-[72px] tracking-tighter text-neutral-100 max-md:max-w-full max-md:text-4xl">Under maintenance</div>
                        <div className="mt-6 max-w-[480px] text-xl leading-8 text-neutral-400 max-md:max-w-full">Sorry, the page you are looking for doesn&apos;t exist or has been moved. Try searching our site</div>{" "}
                        <div className="mt-12 flex items-stretch justify-between gap-4 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
                            <Input showSearchContent onSearch={handleSearch} />
                            <button className="items-stretch justify-center whitespace-nowrap rounded-lg border border-solid bg-violet-500 px-5 py-3 text-base font-semibold leading-6 text-white shadow-sm">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="ml-5 flex w-[46%] flex-col items-stretch max-md:ml-0 max-md:w-full">
                    <Icons.errorpage />
                </div>
            </div>
        </div >
    );
}
export default NotFound;
