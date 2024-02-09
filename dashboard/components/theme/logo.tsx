'use client';
import React, { useState } from 'react';
import Link from 'next/link';

type LogoProps = {
    color?: string;
    width?: number | string;
    height?: number | string;
};

const LogoSVG: React.FC<LogoProps> = ({ color = '#fff', width = 'auto', height = '48' }: LogoProps) => (
    <svg
        width={width}
        height={height}
        x="0"
        y="0"
        className="icon-svg"
        xmlSpace="preserve"
    >
        <path
            fill={color}
            strokeDasharray="1px 1px"
            strokeDashoffset="0"
            d="M23.885 19.583a13.83 13.83 0 001.604-3.552c1.474 3.161 4.679 5.36 8.39 5.36v3.219h-.029c-5.098 0-9.25 4.156-9.25 9.265h-3.214c-.01-4.669 2.557-8.743 6.355-10.884a12.485 12.485 0 01-3.856-3.408z"
            className="st0 svg-elem-1 logo__icon-right"
            pathLength="1"
        ></path>
        <path
            fill={color}
            strokeDasharray="1px 1px"
            strokeDashoffset="0"
            d="M20.499 29.92c-1.426-3.025-4.432-5.156-7.95-5.316-.14.005-.28.005-.426.005V21.37c.14 0 .286.005.426.005a9.175 9.175 0 006.118-2.697 9.204 9.204 0 002.707-6.554h3.219c0 3.335-1.296 6.467-3.654 8.825a12.464 12.464 0 01-2.673 2.045 12.559 12.559 0 013.842 3.392A13.93 13.93 0 0020.5 29.92z"
            className="st0 svg-elem-2 logo__icon-left"
            pathLength="1"
        ></path>
    </svg>
);

export default function Logo({ color = '#fff', width = 'auto', height = '48', ...rest }: LogoProps) {
    const [hasUrl, setHasUrl] = useState(true);
    const [hasIconOnly, setHasIconOnly] = useState(false);

    return (
        <>
            {hasUrl ? (
                <Link href="/">
                    {hasIconOnly ? (
                        <LogoSVG color={color} width={width} height={height} />
                    ) : (
                        <svg
                            width={width}
                            height={height}
                            x="0"
                            y="0"
                            className="icon-svg"
                            xmlSpace="preserve"
                        >
                            <path
                                fill={color}
                                strokeDasharray="1px 1px"
                                strokeDashoffset="0"
                                d="M23.885 19.583a13.83 13.83 0 001.604-3.552c1.474 3.161 4.679 5.36 8.39 5.36v3.219h-.029c-5.098 0-9.25 4.156-9.25 9.265h-3.214c-.01-4.669 2.557-8.743 6.355-10.884a12.485 12.485 0 01-3.856-3.408z"
                                className="st0 svg-elem-1 logo__icon-right"
                                pathLength="1"
                            ></path>
                            <path
                                fill={color}
                                strokeDasharray="1px 1px"
                                strokeDashoffset="0"
                                d="M20.499 29.92c-1.426-3.025-4.432-5.156-7.95-5.316-.14.005-.28.005-.426.005V21.37c.14 0 .286.005.426.005a9.175 9.175 0 006.118-2.697 9.204 9.204 0 002.707-6.554h3.219c0 3.335-1.296 6.467-3.654 8.825a12.464 12.464 0 01-2.673 2.045 12.559 12.559 0 013.842 3.392A13.93 13.93 0 0020.5 29.92z"
                                className="st0 svg-elem-2 logo__icon-left"
                                pathLength="1"
                            ></path>
                        </svg>
                    )}
                </Link>
            ) : (
                <>
                    <h2>else</h2>
                </>
            )}
        </>
    );
}
