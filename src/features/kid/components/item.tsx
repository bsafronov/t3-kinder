import { LoadingCard } from "~/shared/components/loading-card";
import { kidAPI } from "..";
import { Card } from "~/shared/ui/card";
import { format } from "date-fns";
import { EntityActions } from "~/shared/components/entity-actions";
import { useQueryString } from "~/shared/hooks/useQueryString";
import { ModalEnum } from "~/features/_core/modal";
import { motion } from "framer-motion";
export function KidItem() {
  const { data: kid, isLoading } = kidAPI.useGetOne();
  const { pushQuery } = useQueryString();

  const { mutate: deleteKid } = kidAPI.useDelete();

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <Card className="group">
      <motion.div
        className="flex justify-end"
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
      >
        <div className="flex flex-col items-end px-4 py-2 text-xs text-slate-500">
          {kid && (
            <EntityActions
              entity={kid}
              onUpdate={() =>
                pushQuery({ modal: ModalEnum.KID_EDIT, kidId: kid.id })
              }
              onDelete={() => deleteKid({ kidId: kid.id })}
              isAlwaysVisible
            />
          )}
        </div>
      </motion.div>
      <div>
        <table className="w-full border-b">
          <tbody className="divide-y">
            <tr className="divide-x border-t">
              <td className="min-w-[10rem] px-4 text-slate-500">ФИО</td>
              <td className="w-full px-4">
                {kid?.lastName} {kid?.firstName} {kid?.middleName}
              </td>
            </tr>

            <tr className="divide-x">
              <td className="px-4 text-slate-500">Дата рождения</td>
              <td className="px-4">
                {kid?.birthDate &&
                  format(new Date(kid.birthDate), "dd.MM.yyyy")}
                {!kid?.birthDate && (
                  <span className="text-slate-300">Не указано</span>
                )}
              </td>
            </tr>

            <tr className="divide-x">
              <td className="px-4 text-slate-500">Адрес</td>
              <td className="px-4">
                {kid?.adress && kid.adress}
                {!kid?.adress && (
                  <span className="text-slate-300">Не указано</span>
                )}
              </td>
            </tr>

            <tr className="divide-x">
              <td className="px-4 text-slate-500">Полис ОМС</td>
              <td className="px-4">
                {kid?.omsPolicy && kid.omsPolicy}
                {!kid?.omsPolicy && (
                  <span className="text-slate-300">Не указано</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
