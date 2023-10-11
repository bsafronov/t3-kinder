import * as React from "react";

import { cn } from "~/shared/utils/cn";
import { Skeleton } from "./skeleton";

type Props = {
  isLoading?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, isLoading, ...props }, ref) => {
    if (isLoading) {
      return <Skeleton className={cn("h-10 w-full", className)} />;
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 ring-offset-white file:border-0 file:bg-transparent file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
