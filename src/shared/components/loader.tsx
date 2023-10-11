import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}
