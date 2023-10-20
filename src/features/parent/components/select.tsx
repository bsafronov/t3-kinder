import Select from "~/shared/ui/select";
import { parentAPI } from "..";
import { utils } from "~/shared/utils";
import { useState } from "react";
import { Label } from "~/shared/ui/label";
import { Button } from "~/shared/ui/button";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

type Props = {
  backOnSuccess?: boolean;
};

export function ParentSelect({ backOnSuccess }: Props) {
  const kidId = useRouter().query.kidId as string;
  const [selectedParentId, setSelectedParentId] = useState<string | undefined>(
    undefined,
  );
  const router = useRouter();
  const { data: parents } = parentAPI.useGetManyByGroup();
  const { mutateAsync: updateParent, isLoading } = parentAPI.useUpdate();

  const onSubmit = async () => {
    if (!selectedParentId || !kidId) return;

    const parent = parents?.find((parent) => parent.id === selectedParentId);

    if (!parent) return;

    await updateParent({
      parentId: selectedParentId,
      kidIDs: [...parent.kidIDs, kidId],
    });

    backOnSuccess && void router.back();
  };

  const formatParentValue = (parentId?: string) => {
    if (!parentId) return;

    const parent = parents?.find((parent) => parent.id === parentId);

    if (!parent) return;

    return {
      label: utils.formatFio(parent, { full: true }),
      value: parentId,
    };
  };
  return (
    <div>
      <Label>Выберите родителя</Label>
      <Select
        selectType="sync"
        options={parents?.map((parent) => ({
          label: utils.formatFio(parent, { full: true }),
          value: parent.id,
        }))}
        value={formatParentValue(selectedParentId)}
        onChange={(option) => setSelectedParentId(option?.value)}
      />
      <div className="mt-8 flex justify-end gap-2">
        <Button variant={"ghost"} onClick={() => router.back()}>
          Отмена
        </Button>
        <Button
          onClick={() => void onSubmit()}
          disabled={!selectedParentId || isLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Добавить
        </Button>
      </div>
    </div>
  );
}
