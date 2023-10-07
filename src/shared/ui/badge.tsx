import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/shared/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 font-medium text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-0 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default: "text-slate-500 border-slate-100",
        primary: "border-blue-100 bg-blue-100/30 text-blue-500",
        secondary: "border-amber-100 bg-amber-100/30 text-amber-600",
        accent: "border-purple-100 bg-purple-100/30 text-purple-500",
        destructive: "border-red-100 bg-red-100/30 text-red-500",
        success: "border-emerald-100 bg-emerald-100/30 text-emerald-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
