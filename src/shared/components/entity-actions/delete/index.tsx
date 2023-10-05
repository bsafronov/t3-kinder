import { Trash2 } from "lucide-react";
import { Confirm } from "~/shared/ui/confirm";

type Props = {
  onDelete: () => void;
};

export function EntityActionDelete({ onDelete }: Props) {
  return (
    <Confirm variant="destructive" onConfirm={onDelete}>
      <button>
        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
      </button>
    </Confirm>
  );
}
