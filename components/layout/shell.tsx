import React from 'react';

interface ShellLayoutProps {
    children: React.ReactNode;
    header: React.ReactNode;
}

export default function ShellLayout({ children, header }: ShellLayoutProps) {
    return (
        <div className="dark:text-darkTextl max-w-screen-lglg:px-8 mx-auto">
            <aside className="w-[25%]  p-8 ">
                {header}
                <div className="absolute bottom-6 text-xs text-gray-600 dark:text-gray-400">© 2023 with ♥ by aulianza</div>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}