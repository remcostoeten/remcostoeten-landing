import React from "react"

type HoverCardProps = {
  triggerContent: React.ReactNode
  popoverContent: React.ReactNode
}

const HoverCard: React.FC<HoverCardProps> = ({
  triggerContent,
  popoverContent,
}) => {
  return (
    <div className="grid gap-2">
      <div className="hover-card-trigger as-child">{triggerContent}</div>
      <div className="hover-card-content align-start side-left w-[260px] text-sm">
        {popoverContent}
      </div>
    </div>
  )
}

export default HoverCard
