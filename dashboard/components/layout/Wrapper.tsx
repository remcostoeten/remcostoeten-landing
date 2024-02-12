import { tr } from 'date-fns/locale'
import React from 'react'

interface WrapperProps {
    as?: keyof JSX.IntrinsicElements
    isFullHeight?: boolean | string
    padding?: 'small' | 'regular' | 'large' | 'xl'
    hasDottedBg?: boolean
    hasTitle?: boolean
}

const dottedBgStyles: React.CSSProperties = {
    '--dot-bg': '#131417',
    '--dot-color': hasDottedBg ? 'bg-block--absolute' : 'bg-block',
    '--dot-size': '4px',
    '--dot-space': '20px',
    background: `
        linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
        linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
        var(--dot-color)
    `,
    position: 'absolute',
    top: hasTitle ? '20px' : '0px',
    left: '-10px',
    right: 0,
    bottom: 0
};

const radius = 'rounded-sm';
const bgColor = 'bg-block'
const horizontalPadding = padding === 'small' ? 'px-5' : padding === 'regular' ? 'px-10' : padding === 'large' ? 'px-16' : 'px-20'
const verticalPadding = padding === 'small' ? 'px-5' : padding === 'regular' ? 'px-10' : padding === 'large' ? 'px-16' : 'px-20'
const paddingValues = `${horizontalPadding} ${verticalPadding}`

const wrapperStyles: React.CSSProperties = {
    height: isFullHeight ? '100vh' : 'auto',
    ...(hasDottedBg.enabled && {
        '--dot-bg': '#131417',
        '--dot-color': '#26282c',
        '--dot-size': '3px',
        '--dot-space': '22px',
        background: `
                linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                var(--dot-color)
            `,
        backgroundPosition: hasTitle ? 'top 20%' : 'top 0'
    })
}

return (
    <Element className={`${radius} ${bgColor} ${paddingValues}`} style={wrapperStyles}>
        Wrapper
    </Element>
)
}

