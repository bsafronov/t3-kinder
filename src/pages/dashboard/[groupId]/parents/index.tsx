import { ParentTable } from "~/features/parent";
import { Heading } from "~/shared/ui/title";

export default function ParentsPage() {
  return (
    <>
      <Heading title="Родители" />
      <ParentTable />
    </>
  );
}
