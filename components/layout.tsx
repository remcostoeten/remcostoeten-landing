type SeperatorProps = {
  width?: string
  fade?: any
  color?: string
  opacity?: string
  className?: string
}

export default function Seperator({
  width,
  fade,
  color,
  opacity,
  className,
}: SeperatorProps) {
  return (
    <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
  )
}
