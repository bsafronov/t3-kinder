import { CreateVaccinationForm } from "~/features/vaccination";
import { Card } from "~/shared/ui/card";

export function KidVaccinations() {
  return (
    <Card className="p-4">
      <CreateVaccinationForm />
    </Card>
  );
}
