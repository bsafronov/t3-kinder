import { type LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  variant?: "primary" | "secondary";
  title: string;
  icon?: LucideIcon;
};

export const Heading = ({ title, icon: Icon, variant = "primary" }: Props) => {
  if (variant === "primary") {
    return (
      <h1 className="mb-8 flex items-center gap-2 text-center text-3xl text-4xl font-bold md:text-start">
        {Icon && <Icon className="h-8 w-8" />}
        {title}
      </h1>
    );
  }
  return (
    <h3 className="flex items-center gap-2 text-center text-2xl font-semibold text-slate-500 md:text-start">
      {Icon && <Icon className="h-8 w-8" />}
      {title}
    </h3>
  );
};
