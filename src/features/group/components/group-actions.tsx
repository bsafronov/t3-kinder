import { useRouter } from "next/router";
import { Button } from "~/shared/ui/button";
import { Confirm } from "~/shared/ui/confirm";
import { groupAPI } from "..";
import { Heading } from "~/shared/ui/title";

export function GroupActions() {
  const router = useRouter();
  const { mutateAsync: deleteGroup } = groupAPI.useDelete();

  const handleDeleteGroup = async () => {
    const groupId = router.query.group;

    if (!groupId || Array.isArray(groupId)) return;
    await deleteGroup({ groupId });
    void router.push("/dashboard");
  };

  return (
    <div className="">
      <Heading title="Настройки группы" />
      <div>
        <h3 className="text-2xl font-semibold text-red-600">Опасная зона</h3>
        <div className="rounded-md border border-red-200 bg-red-200/70 p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-600">Удаление группы со всеми данными</p>
            <Confirm
              onConfirm={() => void handleDeleteGroup()}
              variant="destructive"
            >
              <Button variant={"destructive"}>Удалить</Button>
            </Confirm>
          </div>
        </div>
      </div>
    </div>
  );
}
