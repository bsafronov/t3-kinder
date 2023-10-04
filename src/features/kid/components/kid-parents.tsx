import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { ModalEnum } from "~/features/_core/modal/query.types";
import { ParentItem } from "~/features/parent";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { api } from "~/shared/utils/api";

export function KidParents() {
  const groupId = useRouter().query.groupId as string;
  const kidId = useRouter().query.kidId as string;
  const { pushQuery } = useQueryString();
  const { data: parents, isSuccess } = api.parents.getAll.useQuery(
    { groupId, kidId },
    { enabled: !!groupId && !!kidId },
  );

  return (
    <Card className="overflow-hidden">
      {isSuccess && parents.length === 0 && (
        <div className="border-b px-4 py-1 text-sm text-slate-500">
          У ребёнка пока не указаны родители
        </div>
      )}
      {isSuccess && parents.length > 0 && (
        <ul className="divide-y border-b">
          {parents.map((parent) => (
            <li key={parent.id}>
              <ParentItem {...parent} />
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end px-4 py-2">
        <Button
          variant={"link"}
          size={"contents"}
          onClick={() => pushQuery({ modal: ModalEnum.PARENT_CREATE })}
        >
          <Plus className="h-3 w-3" />
          Добавить родителя
        </Button>
      </div>
    </Card>
  );
}
