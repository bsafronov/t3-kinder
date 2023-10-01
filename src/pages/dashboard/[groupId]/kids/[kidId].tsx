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
        <h3 className="mb-1 text-2xl font-semibold">Основная информация</h3>
        <KidMainInfo />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold">Родители</h3>
        <KidParents />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold">Прививки</h3>
        <KidVaccinations />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold">Дни отсутствия</h3>
        <KidAbsences />
      </div>
      <div>
        <h3 className="mb-1 text-2xl font-semibold">Примечания</h3>
        <KidNotes />
      </div>
    </div>
  );
}
