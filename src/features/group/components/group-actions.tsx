import { useRouter } from "next/router";
import { Button } from "~/shared/ui/button";
import { Confirm } from "~/shared/ui/confirm";
import { api } from "~/shared/utils/api";

export function GroupActions() {
  const router = useRouter();
  const ctx = api.useContext();
  const { mutate: deleteGroup } = api.groups.delete.useMutation({
    onSuccess: async () => {
      await ctx.groups.getAll.invalidate();
      void router.push("/dashboard");
    },
  });

  const handleDeleteGroup = () => {
    const groupId = router.query.group;

    if (!groupId || Array.isArray(groupId)) return;
    deleteGroup({ groupId });
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold">Действия с группой</h3>
      <div className="flex justify-end">
        <Confirm onConfirm={handleDeleteGroup} variant="destructive">
          <Button variant={"destructive"}>Удалить</Button>
        </Confirm>
      </div>
    </div>
  );
}
