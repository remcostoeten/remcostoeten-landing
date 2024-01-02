import { hexToRGBA } from '@/core/lib/utils';
import React from 'react'

interface LabelPillProps {
    label: string;
    color: string;
    background: string;
    borderColor: string;
}

export default function LabelPill({ label, color, background, borderColor }: LabelPillProps) {
    const backgroundColor = hexToRGBA(background, 0.16);

    return (
        <span
            data-name={label}
            style={{
                color: color,
                background: backgroundColor,
                borderColor: borderColor,
                textDecoration: `none solid ${color}`,
                display: 'inline-block',
                padding: '0px 7px',
                fontSize: '12px',
                fontWeight: 300,
                lineHeight: '18px',
                whiteSpace: 'nowrap',
                border: `0.571429px solid ${borderColor}`,
                borderRadius: '24px',
                outlineOffset: '-2px',
                boxSizing: 'border-box',
            }}
        >
            {label}
        </span>
    );
}