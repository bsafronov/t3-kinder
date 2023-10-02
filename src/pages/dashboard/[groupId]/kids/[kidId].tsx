import {
  KidAbsences,
  KidMainInfo,
  KidNotes,
  KidParents,
  KidVaccinations,
} from "~/features/kid";

export default function KidPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold">Данные о ребёнке</h1>
      <div>
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">
          Основная информация
        </h3>
        <KidMainInfo />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Родители</h3>
        <KidParents />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">Прививки</h3>
        <KidVaccinations />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">
          Дни отсутствия
        </h3>
        <KidAbsences />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold text-slate-500">
          Примечания
        </h3>
        <KidNotes />
      </div>
    </div>
  );
}
