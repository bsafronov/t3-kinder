import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { AddParentForm } from "~/features/parent";
import { ParentItem } from "~/features/parent/components/parent-item";
import { Card } from "~/shared/ui/card";
import { api } from "~/shared/utils/api";

export function KidParents() {
  const groupId = useRouter().query.groupId as string;
  const kidId = useRouter().query.kidId as string;
  const {
    data: parents,
    isLoading,
    isSuccess,
  } = api.parents.getAll.useQuery(
    { groupId, kidId },
    { enabled: !!groupId && !!kidId },
  );

  if (isLoading) {
    return (
      <Card className="flex justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </Card>
    );
  }
  return (
    <Card className="overflow-hidden">
      {isSuccess && parents.length > 0 && (
        <ul className="divide-y border-b">
          {parents.map((parent) => (
            <li key={parent.id}>
              <ParentItem {...parent} />
            </li>
          ))}
        </ul>
      )}
      <AddParentForm />
    </Card>
  );
}
