import { useEffect, useState } from "react";
import { VaccinationTagCreateModal } from "../../vaccination-tag/components/create-modal";
import {
  VaccinationCreateModal,
  VaccinationEditModal,
} from "~/features/vaccination";
import { ParentCreateModal, ParentEditModal } from "~/features/parent";

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
    </>
  );
}
