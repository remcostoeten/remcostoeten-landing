import React from 'react';

type PillProps = {
    children: React.ReactNode;
    color?: string;
    backgroundColor?: string;
    fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    borderRadius?: string;
}

const tailwindColors = {
    'red-500': '#f56565',
    'green-500': '#48bb78',
    'blue-500': '#4299e1',
    // Add more Tailwind CSS color classes and their corresponding hex values here
};

export default function Pill({ children, color = 'black', backgroundColor = 'white', fontSize = 'sm', borderRadius = 'rounded-lg' }: PillProps) {
    const fontSizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
    };

    const textColor = tailwindColors[color] || color;
    const bgColor = tailwindColors[backgroundColor] || backgroundColor;

    return (
        <div style={{ color: textColor, backgroundColor: bgColor }} className={`${fontSizeClasses[fontSize]} flex items-center justify-center border border-[#323205] ${borderRadius} px-3 py-1`}>
            {children}
        </div>
    );
}