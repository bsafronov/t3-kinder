import { EditIcon } from "lucide-react";

type Props = {
  onUpdate: () => void;
};

export function EntityActionUpdate({ onUpdate }: Props) {
  return (
    <button
      onClick={onUpdate}
      className="flex items-center gap-2 px-4 py-1 text-sm text-blue-500 hover:bg-blue-50"
    >
      <EditIcon className="h-4 w-4 " />
      Изменить
    </button>
  );
}
