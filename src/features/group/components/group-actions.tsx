import { useRouter } from "next/router";
import { Button } from "~/shared/ui/button";
import { Confirm } from "~/shared/ui/confirm";
import { groupAPI } from "..";

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
    <div>
      <h3 className="text-2xl font-semibold">Действия с группой</h3>
      <div className="flex justify-end">
        <Confirm
          onConfirm={() => void handleDeleteGroup()}
          variant="destructive"
        >
          <Button variant={"destructive"}>Удалить</Button>
        </Confirm>
      </div>
    </div>
  );
}
