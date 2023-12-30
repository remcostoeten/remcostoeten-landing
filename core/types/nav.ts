import { ReactNode } from "react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type MenuItemProps = {
  title: string
  href: string
  icon: JSX.Element
  isShow?: boolean
  isExternal: boolean
  onClick?: () => void
  className?: string
  children?: ReactNode
  eventName?: string
  hideIcon?: boolean
  type?: string
}
