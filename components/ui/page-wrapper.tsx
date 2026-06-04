import React from "react";
import { cn } from "@/lib/utils";

export default function PageWrapper({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("bg-white pointer-events-auto h-[98vh] rounded-sm p-3", className)}
    >
      {children}
    </div>
  )
}