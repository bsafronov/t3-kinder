import { Trash2 } from "lucide-react";
import { Confirm } from "~/shared/ui/confirm";

type Props = {
  onDelete: () => void;
};

export function EntityActionDelete({ onDelete }: Props) {
  return (
    <Confirm variant="destructive" onConfirm={onDelete}>
      <button className="flex items-center gap-2 px-4 py-1 text-sm text-red-500 hover:bg-red-50">
        <Trash2 className="h-4 w-4" />
        Удалить
      </button>
    </Confirm>
  );
}
