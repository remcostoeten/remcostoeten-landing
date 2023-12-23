import React from 'react';

interface ShellLayoutProps {
    children: React.ReactNode;
    header: React.ReactNode;
}

export default function ShellLayout({ children, header }: ShellLayoutProps) {
    return (
        <div className="dark:text-darkTextl mx-auto max-w-6xl lg:px-8">
            <aside className="w-64 p-8 ">
                {header}
                <div className="absolute bottom-6 text-xs text-gray-600 dark:text-gray-400">© 2023 with ♥ by aulianza</div>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}