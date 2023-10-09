import {
  KidAbsences,
  KidItem,
  KidNotes,
  KidParents,
  KidVaccinations,
} from "~/features/kid";
import { Heading } from "~/shared/ui/title";

export default function KidPage() {
  return (
    <div className="space-y-8">
      <Heading title="Данные о ребёнке" />
      <div>
        <Heading title="Основная информация" variant="secondary" />
        <KidItem />
      </div>
      <div>
        <Heading title="Родители" variant="secondary" />
        <KidParents />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Прививки</h3>
        <KidVaccinations />
      </div>
      <div>
        <Heading title="Дни отсутствия" variant="secondary" />
        <KidAbsences />
      </div>
      <div>
        <Heading title="Примечания" variant="secondary" />
        <KidNotes />
      </div>
    </div>
  );
}
