import { Plus } from "lucide-react";
import { ModalEnum } from "~/features/_core/modal/query.types";
import { VaccinationItem, vaccinationAPI } from "~/features/vaccination";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingCard } from "~/shared/components/loading-card";

export function KidVaccinations() {
  const { pushQuery } = useQueryString();
  const {
    data: kidVaccinations,
    isSuccess,
    isLoading,
  } = vaccinationAPI.useGetManyByKid();

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <Card className="overflow-hidden">
      {isSuccess && kidVaccinations.length === 0 && (
        <div className="border-b px-4 py-1 text-sm text-slate-500">
          У ребёнка пока не указаны прививки
        </div>
      )}
      {isSuccess && kidVaccinations.length > 0 && (
        <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }}>
          <AnimatePresence mode="popLayout">
            {kidVaccinations.map((vaccination, index) => (
              <motion.li
                layout
                key={vaccination.id}
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                style={{ borderBottomWidth: "1px" }}
                transition={{ delay: index * 0.05 }}
              >
                <VaccinationItem {...vaccination} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
      <div className="flex justify-end px-4 py-2">
        <Button
          variant={"link"}
          size={"contents"}
          onClick={() => pushQuery({ modal: ModalEnum.VACCINATION_CREATE })}
        >
          <Plus className="h-3 w-3" />
          Добавить прививку
        </Button>
      </div>
    </Card>
  );
}
