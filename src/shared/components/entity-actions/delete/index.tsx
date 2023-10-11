import { Trash2 } from "lucide-react";
import { Confirm } from "~/shared/ui/confirm";

type Props = {
  onDelete: () => void;
};

export function EntityActionDelete({ onDelete }: Props) {
  return (
    <Confirm variant="destructive" onConfirm={onDelete}>
      <button className="flex items-center justify-between gap-2 px-2 py-1 text-red-500 hover:bg-red-50">
        Удалить
        <Trash2 className="h-4 w-4" />
      </button>
    </Confirm>
  );
}
