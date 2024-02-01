import { useEffect, ReactNode } from "react";

const devMode = process.env.NODE_ENV !== 'production'

type visualizeProps = {
    showAlert?: () => void,
    children?: ReactNode
}

export default function VisualizeComponent(showAlert = false, children: ReactNode): visualizeProps {
    if (!devMode) {
        return { children };
    }

    if (showAlert) {
        useEffect(() => {
            alert('component is mounted')
        }, [])
    }

    return {
        children: (
            <span style={{ outline: '10px solid red' }}>
                {children}
            </span>
        )
    };
}

// usage
// const { children } = useVisualizeComponent(true, <div>hello</div>);

// return (
// <>{children}</>
// )
