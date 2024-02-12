import React from 'react'

interface WrapperProps {
    as?: keyof JSX.IntrinsicElements
    isFullHeight?: boolean | string
    padding?: 'small' | 'regular' | 'large' | 'xl'
    hasDottedBg?: boolean
    hasTitle?: boolean
    children?: React.ReactNode
}

export default function Wrapper({
    as: Element = 'div',
    isFullHeight = 'min-h-dvh',
    padding = 'regular',
    hasDottedBg = false,
    hasTitle = false,
    children,
    ...rest
}: WrapperProps) {
    const radius = 'rounded-sm'
    const horizontalPadding = padding === 'small' ? 'px-5' : padding === 'regular' ? 'px-10' : padding === 'large' ? 'px-16' : 'px-20'
    const verticalPadding = padding === 'small' ? 'px-5' : padding === 'regular' ? 'px-10' : padding === 'large' ? 'px-16' : 'px-20'
    const paddingValues = `${horizontalPadding} ${verticalPadding}`

    const wrapperStyles: React.CSSProperties = {
        height: isFullHeight ? '100vh' : 'auto',
        position: 'relative'
    }

    const solidBgStyles: React.CSSProperties = {
        backgroundColor: '#131417',
        zIndex: -2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    const dottedBgStyles: React.CSSProperties = hasDottedBg ? {
        // @ts-ignore
        '--dot-bg': '#131417',
        '--dot-color': '#26282c',
        '--dot-size': '3px',
        '--dot-space': '22px',
        background: `
            linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
            linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
            var(--dot-color)
        `,
        zIndex: -1,
        position: 'absolute',
        top: hasTitle ? '5%' : '0',
        left: 0,
        right: 0,
        bottom: 0
    } : {};


    return (
        <Element
            className={`Wrapper ${hasTitle ? 'pt-10' : 'bg-block'} ${radius} ${paddingValues}`}
            style={wrapperStyles}
            {...rest}
        >
            {children}
            <div style={solidBgStyles} />
            {hasDottedBg ? (
                <div
                    className="dotted-bg"
                    style={dottedBgStyles}
                />
            ) : null}
        </Element>
    )
}