import { Plus } from "lucide-react";
import { ModalEnum } from "~/features/_core/modal/query.types";
import { ParentItem, parentAPI } from "~/features/parent";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingCard } from "~/shared/components/loading-card";

export function KidParents() {
  const { pushQuery } = useQueryString();
  const { data: parents, isSuccess, isLoading } = parentAPI.useGetManyByKid();

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <Card className="overflow-hidden">
      {isSuccess && parents.length === 0 && (
        <div className="border-b px-4 py-1 text-sm text-slate-500">
          У ребёнка пока не указаны родители
        </div>
      )}

      {isSuccess && parents.length > 0 && (
        <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }}>
          <AnimatePresence mode="popLayout">
            {parents.map((parent, index) => (
              <motion.li
                layout
                key={parent.id}
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                style={{ borderBottomWidth: "1px" }}
                transition={{ delay: index * 0.1 }}
              >
                <ParentItem {...parent} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
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
