import { EditIcon } from "lucide-react";

type Props = {
  onUpdate: () => void;
};

export function EntityActionUpdate({ onUpdate }: Props) {
  return (
    <button onClick={onUpdate}>
      <EditIcon className="h-4 w-4 text-blue-500 hover:text-blue-600" />
    </button>
  );
}
