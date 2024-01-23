import React from 'react';
import Link from 'next/link'

type AnimatedAnchorProps = {
    href?: any;
    children?: React.ReactNode;
    backgroundColor?: string;
}

export default function AnimatedAnchor({ href = '#', children }: AnimatedAnchorProps) {
    return (
        <Link href={href} className='anchor'>
            {children}
        </Link>
    )
};
