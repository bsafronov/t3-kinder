import { KidMainInfo } from "~/features/kid";

export default function KidPage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-semibold">Данные о ребёнке</h1>
      <h3 className="mb-1 text-2xl font-semibold">Основная информация</h3>
      <KidMainInfo />
    </div>
  );
}
