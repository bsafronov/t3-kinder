import { useEffect, useState } from "react";
import {
  VaccinationCreateModal,
  VaccinationEditModal,
} from "~/features/vaccination";
import { ParentCreateModal, ParentEditModal } from "~/features/parent";
import { AbsenceCreateModal, AbsenceUpdateModal } from "~/features/absence";
import { AbsenceTagCreateModal } from "~/features/absence-tag";
import { VaccinationTagCreateModal } from "~/features/vaccination-tag";

export function ModalProvider() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <VaccinationTagCreateModal />

      <VaccinationCreateModal />
      <VaccinationEditModal />

      <ParentCreateModal />
      <ParentEditModal />

      <AbsenceCreateModal />
      <AbsenceUpdateModal />

      <AbsenceTagCreateModal />
    </>
  );
}
