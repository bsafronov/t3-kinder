import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { useQueryString } from "../hooks/useQueryString";
import type { ModalEnum } from "~/features/_core/modal";

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  query: ModalEnum;
};

export const Modal = forwardRef<React.ElementRef<typeof DialogContent>, Props>(
  ({ children, description, title, query }, ref) => {
    const isOpen = location.search.includes(query);
    const { pushQuery } = useQueryString();

    return (
      <Dialog open={isOpen} onOpenChange={() => pushQuery({ modal: [] })}>
        <DialogContent ref={ref}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  },
);

Modal.displayName = "Modal";