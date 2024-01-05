export interface LabelPillProps {
    label?: string
    color?: string
    background?: string
    borderColor?: string
    children?: React.ReactNode
}

export type Label = {
    name: string
    color: string
}

export type IssueRowProps = {
    taskId: string
    dates?: string[]
    labels: Label[]
    title: string
    url?: string
    priority: string
    onCheckboxChange?: () => void
}

export type InspirationRowProps = {
    taskId: string
    dates?: string[]
    labels: Label[]
    title: string
    url?: string
    priority: string
    onCheckboxChange?: () => void
    name?: string
    projects?: string
}