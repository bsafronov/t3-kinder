import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { buttonVariants } from "./button";

type Props = {
  children: React.ReactNode;
  onConfirm: () => void;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};
export const Confirm = ({
  children,
  description,
  title,
  variant = "default",
  onConfirm,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Вы уверены?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? "Это действие невозможно будет отменить."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant })}
            onClick={onConfirm}
          >
            {variant === "destructive" ? "Удалить" : "Подтвердить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
