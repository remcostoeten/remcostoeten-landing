import React from 'react';

interface ShellLayoutProps {
    children: React.ReactNode;
    header: React.ReactNode;
}

export default function ShellLayout({ children, header }: ShellLayoutProps) {
    return (
        <div className="dark:text-darkTextl mx-auto flex max-w-[1440px] lg:px-8">
            <aside className="w-[25%] p-8">
                {header}
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}