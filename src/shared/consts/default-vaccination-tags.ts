import { type VaccinationTag } from "@prisma/client";

export const defaultVaccinationTags: Omit<VaccinationTag, "id" | "groupId">[] =
  [
    { label: "Туберкулез" },
    { label: "Гепатит В" },
    { label: "Пневмококковая инфекция" },
    { label: "Коклюш" },
    { label: "Дифтерия" },
    { label: "Столбняк" },
    { label: "Полиомиелит" },
    { label: "Гемофильная инфекция" },
    { label: "Корь" },
    { label: "Краснуха" },
    { label: "Свинка" },
    { label: "Грипп" },
    { label: "Паротит" },
    { label: "Коронавирус" },
  ];
