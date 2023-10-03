import { useEffect, useState } from "react";
import { VaccinationTagCreateModal } from "../../vaccination-tag/components/create-modal";
import {
  VaccinationCreateModal,
  VaccinationEditModal,
} from "~/features/vaccination";

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
    </>
  );
}
