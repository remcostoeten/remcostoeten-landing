import React from 'react';
import {
    Tooltip,
    TooltipContent, TooltipTrigger
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
    trigger: React.ReactNode;
    triggerAs?: string;
    triggerProps?: React.HTMLAttributes<HTMLElement>;
    triggerClassName?: string;
    content: React.ReactNode;
    contentAs?: string;
    contentProps?: React.HTMLAttributes<HTMLElement>;
    contentClassName?: string;
}

export default function CustomTooltip({ trigger, triggerAs = 'span', triggerProps = {}, triggerClassName, content, contentAs = 'p', contentProps = {}, contentClassName }: CustomTooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger>
                {React.createElement(triggerAs, { className: triggerClassName, ...triggerProps }, trigger)}
            </TooltipTrigger>
            <TooltipContent>
                {React.createElement(contentAs, { className: contentClassName, ...contentProps }, content)}
            </TooltipContent>
        </Tooltip>
    );
}

/**
 * @param [trigger - The element that triggers the tooltip when interacted with.
 * @param [triggerAs='span'] - The type of HTML element to wrap the trigger in. Defaults to 'span'.
 * @param [triggerProps] - Additional props to be applied to the trigger element.
 * @param [triggerClassName] - Class name to be applied to the trigger element.
 * @param [content - The content to be displayed within the tooltip.
 * @param [contentAs='p'] - The type of HTML element to wrap the content in. Defaults to 'p'.
 * @param [contentProps] - Additional props to be applied to the content element.
 * @param [contentClassName] - Class name to be applied to the content element.
 *
 * @example
 * // Using CustomTooltip with a span tag for trigger and content
 * <CustomTooltip triggerAs='span' trigger='Hover me' triggerClassName='trigger-class' contentAs='span' content='This is a tooltip content' contentClassName='content-class'/>
 *
 * @example
 * // Using CustomTooltip with an anchor tag for trigger and content
 * <CustomTooltip triggerAs='a' trigger='Hover me' triggerProps={{href: 'https://example.com'}} triggerClassName='trigger-class' contentAs='a' content='Click here' contentProps={{href: 'https://example.com'}} contentClassName='content-class'/>
 */