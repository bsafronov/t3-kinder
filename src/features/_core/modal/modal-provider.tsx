import { useEffect, useState } from "react";
import { KidCreateModal, KidUpdateModal } from "~/features/kid";
import {
  VaccinationCreateModal,
  VaccinationEditModal,
} from "~/features/vaccination";
import { VaccinationTagCreateModal } from "~/features/vaccination-tag";
import { ParentCreateModal, ParentEditModal } from "~/features/parent";
import { AbsenceCreateModal, AbsenceUpdateModal } from "~/features/absence";
import { AbsenceTagCreateModal } from "~/features/absence-tag";
import { NoteCreateModal, NoteUpdateModal } from "~/features/note";
import { NoteTagCreateModal } from "~/features/note-tag";
import { CreateEntityModal } from "~/shared/components/create-entity-modal";

export function ModalProvider() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <KidCreateModal />
      <KidUpdateModal />

      <VaccinationTagCreateModal />

      <VaccinationCreateModal />
      <VaccinationEditModal />

      <ParentCreateModal />
      <ParentEditModal />

      <AbsenceCreateModal />
      <AbsenceUpdateModal />
      <AbsenceTagCreateModal />

      <NoteCreateModal />
      <NoteUpdateModal />
      <NoteTagCreateModal />

      <CreateEntityModal />
    </>
  );
}
