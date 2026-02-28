import React from "react";

import { 
  LibTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./lib-ui";

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
  delayDuration?: number;
};

export const Tooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  className,
  delayDuration = 200,
}: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <LibTooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={className}
        >
          {content}
        </TooltipContent>
      </LibTooltip>
    </TooltipProvider>
  );
};
