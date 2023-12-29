type seperatorProps = {
  width?: number
  className?: string
  fade?: boolean
  color?: string
  opacity?: number
}

export default function Seperator({
  width,
  className,
  fade,
  color,
  opacity,
}: seperatorProps) {
  return (
    <div className={className ? `relative ${className}` : "relative"}>
      <hr
        className={`bg-neutral-00 opacity-1100 my-2 h-0.5 border-t-0 dark:opacity-50 ${
          fade ? "bg-gradient-to-r from-transparent to-white" : ""
        } ${className}`}
        style={{ width: `${width}%`, backgroundColor: color, opacity: opacity }}
      ></hr>
    </div>
  )
}

// Example usage of the Seperator component
{
  /* <Seperator width={50} className="my-seperator" fade={false} color="red" opacity={1} />
<Seperator width={100} className="custom-class" fade={false} color="blue" opacity={0.5} />
<Seperator width={75} fade={true} color="green" opacity={0.75} />
<Seperator width={25} className="another-custom-class" fade={true} opacity={1} /> */
}
