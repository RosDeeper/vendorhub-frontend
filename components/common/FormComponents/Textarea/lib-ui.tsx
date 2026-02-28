import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = ({ className, ...props }: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "focus-visible:ring-ring/50 p-2! border",
        "flex field-sizing-content min-h-16 w-full rounded-md",
        "bg-white text-base shadow-md transition-[color,box-shadow]",
        "outline-none disabled:cursor-not-allowed",
        "disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
};

export { Textarea };
