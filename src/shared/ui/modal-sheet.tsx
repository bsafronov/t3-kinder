import { forwardRef } from "react";
import { DialogDescription, DialogTitle } from "./dialog";
import { useQueryString } from "../hooks/useQueryString";
import type { ModalEnum } from "~/features/_core/modal";
import { Sheet, SheetContent, SheetHeader } from "./sheet";

type Props = {
  title: string;
  description?: string;
  side?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
  query: ModalEnum;
};

export const SheetModal = forwardRef<
  React.ElementRef<typeof SheetContent>,
  Props
>(({ children, description, title, query, side }, ref) => {
  const isOpen = location.search.includes(query);
  const { pushQuery } = useQueryString();

  return (
    <Sheet open={isOpen} onOpenChange={() => pushQuery({ modal: [] })}>
      <SheetContent ref={ref} side={side}>
        <SheetHeader className="mb-8 text-start">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
});

SheetModal.displayName = "SheetModal";
