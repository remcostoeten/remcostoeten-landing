import React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CustomTooltipProps {
  trigger: React.ReactNode;
  triggerAs?: string;
  triggerProps?: React.HTMLAttributes<HTMLElement>;
  triggerClassName?: string;
  content: React.ReactNode;
  contentAs?: string;
  contentProps?: React.HTMLAttributes<HTMLElement>;
  contentClassName?: string;
  AnimatedAnchor?: boolean;
}

export default function CustomTooltip({
  trigger,
  triggerAs = "span",
  triggerProps = {},
  triggerClassName,
  content,
  contentAs = "p",
  contentProps = {},
  contentClassName,
  AnimatedAnchor = false,
}: CustomTooltipProps) {
  const TriggerElement = React.createElement(
    triggerAs,
    { className: triggerClassName, ...triggerProps },
    trigger
  );

  return (
    <Tooltip>
      <TooltipTrigger>
        {AnimatedAnchor && <span className="anchor">{TriggerElement}</span>}
        {!AnimatedAnchor && TriggerElement}
      </TooltipTrigger>
      <TooltipContent>
        {React.createElement(
          contentAs,
          { className: contentClassName, ...contentProps },
          content
        )}
      </TooltipContent>
    </Tooltip>
  );
}
