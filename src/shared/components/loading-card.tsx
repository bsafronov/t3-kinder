import { Loader2 } from "lucide-react";
import { Card } from "../ui/card";

export function LoadingCard() {
  return (
    <Card className="flex items-center justify-center p-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </Card>
  );
}
