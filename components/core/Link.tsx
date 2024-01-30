"use client"

import React from "react"
import { Link as NextLink } from "@/core/NODE_MODULES_PATCHES/next-link"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type LinkVariant =
  | "default"
  | "tooltip"
  | "button"
  | "icon"
  | "animated"
  | "dialog"
  | "external"
  | "disabled"

type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  variant?: LinkVariant
  tooltipContent?: string
  dialogContent?: React.ReactNode
  isExternal?: boolean
  isDisabled?: boolean
  target?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  rel?: string
  hasIcon?: boolean
  style?: React.CSSProperties
  icon?: any
  iconPosition?: "before" | "after"
  animate?: boolean
  brightness?: "normal" | "light" | "lowest-brightness"
}

export const AnimatedLink: React.FC<LinkProps> = ({
  href,
  children,
  animate,
  brightness,
  ...rest
}) => {
  const anchorStyles: React.CSSProperties = {
    position: "relative",
  }

  if (animate) {
    anchorStyles.position = "relative"
    anchorStyles.overflow = "hidden"
  }

  if (brightness === "light") {
    anchorStyles.opacity = 0.5
  } else if (brightness === "lowest-brightness") {
    anchorStyles.opacity = 0.2
  }

  return (
    <DefaultLink className={animate ? "anchor" : ""} href={href} {...rest}>
      {children}
    </DefaultLink>
  )
}

const DefaultLink: React.FC<LinkProps> = ({
  href,
  style,
  children,
  ...rest
}) => (
  <NextLink href={href} {...rest}>
    {children}
  </NextLink>
)

const IconLink: React.FC<LinkProps> = ({
  icon,
  children,
  iconPosition = "before",
  ...rest
}) => (
  <DefaultLink {...rest}>
    {iconPosition === "before" && icon}
    {children}
    {iconPosition === "after" && icon}
  </DefaultLink>
)

const TooltipLink: React.FC<LinkProps> = ({
  href,
  children,
  tooltipContent,
  ...rest
}) => (
  <Tooltip>
    <TooltipTrigger>
      <DefaultLink href={href} {...rest}>
        {children}
      </DefaultLink>
    </TooltipTrigger>
    <TooltipContent>{tooltipContent}</TooltipContent>
  </Tooltip>
)

const ButtonLink: React.FC<LinkProps> = ({
  children,
  icon,
  hasIcon,
  ...rest
}) => (
  <Button>
    <DefaultLink {...rest}>{children}</DefaultLink>
  </Button>
)

const DialogLink: React.FC<LinkProps> = ({
  href,
  children,
  dialogContent,
  ...rest
}) => (
  <AlertDialog>
    <AlertDialogTrigger>
      <DefaultLink href={href} {...rest}>
        {children}
      </DefaultLink>
    </AlertDialogTrigger>
    <AlertDialogContent>{dialogContent}</AlertDialogContent>
  </AlertDialog>
)

export default function Link({
  variant,
  isExternal,
  isDisabled,
  ...props
}: LinkProps) {
  variant = variant || "default"

  switch (variant) {
    case "tooltip":
      return <TooltipLink {...props} />
    case "animated":
      return <AnimatedLink {...props} />
    case "dialog":
      return <DialogLink {...props} />
    case "button":
      return <ButtonLink {...props} />
    case "icon":
      return <IconLink {...props} />
    case "external":
      return (
        <DefaultLink target="_blank" rel="noopener noreferrer" {...props} />
      )
    case "disabled":
      return <DefaultLink onClick={(e) => e.preventDefault()} {...props} />
    default:
      return <DefaultLink {...props} />
  }
}
