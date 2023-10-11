import { EditIcon } from "lucide-react";

type Props = {
  onUpdate: () => void;
};

export function EntityActionUpdate({ onUpdate }: Props) {
  return (
    <button
      onClick={onUpdate}
      className="flex items-center justify-between gap-2 px-2 py-1 text-blue-500 hover:bg-blue-50"
    >
      Изменить
      <EditIcon className="h-4 w-4 " />
    </button>
  );
}
