import { Plus } from "lucide-react";
import { ModalEnum } from "~/features/_core/modal/query.types";
import { NoteItem, noteAPI } from "~/features/note";
import { LoadingCard } from "~/shared/components/loading-card";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export function KidNotes() {
  const { pushQuery } = useQueryString();
  const { data: notes, isSuccess, isLoading } = noteAPI.useGetManyByKid();

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <Card className="overflow-hidden">
      {isSuccess && notes.length === 0 && (
        <div className="border-b px-4 py-1 text-sm text-slate-500">
          У ребёнка пока не указаны примечания
        </div>
      )}
      {isSuccess && notes.length > 0 && (
        <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }}>
          <AnimatePresence mode="popLayout">
            {notes.map((note, index) => (
              <motion.li
                layout
                key={note.id}
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                style={{ borderBottomWidth: "1px" }}
                transition={{ delay: index * 0.05 }}
              >
                <NoteItem {...note} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
      <div className="flex justify-end px-4 py-2">
        <Button
          variant={"link"}
          size={"contents"}
          onClick={() => pushQuery({ modal: ModalEnum.NOTE_CREATE })}
        >
          <Plus className="h-3 w-3" />
          Добавить примечание
        </Button>
      </div>
    </Card>
  );
}
