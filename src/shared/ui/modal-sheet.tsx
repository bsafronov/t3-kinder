import { forwardRef } from "react";
import { DialogDescription, DialogTitle } from "./dialog";
import { useQueryString } from "../hooks/use-query-string";
import type { ModalEnum } from "~/features/_core/modal";
import { Sheet, SheetContent, SheetHeader } from "./sheet";

type Props = {
  title?: string;
  description?: string;
  side?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
  query: ModalEnum;
  className?: string;
};

export const SheetModal = forwardRef<
  React.ElementRef<typeof SheetContent>,
  Props
>(({ children, description, title, query, side, className }, ref) => {
  const isOpen = location.search.includes(query);
  const { pushQuery } = useQueryString();

  return (
    <Sheet open={isOpen} onOpenChange={() => pushQuery({ modal: [] })}>
      <SheetContent ref={ref} side={side} className={className}>
        <SheetHeader className="mb-8 text-start">
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
});

SheetModal.displayName = "SheetModal";
