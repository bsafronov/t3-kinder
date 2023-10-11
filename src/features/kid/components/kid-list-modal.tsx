import { ModalEnum } from "~/features/_core/modal";
import { SheetModal } from "~/shared/ui/modal-sheet";
import { SidebarKidList } from "./sidebar-kid-list";

export function KidListModal() {
  return (
    <SheetModal query={ModalEnum.KIDS_LIST} side="bottom" className="px-0 py-4">
      <div className="border-t border-slate-50">
        <SidebarKidList />
      </div>
    </SheetModal>
  );
}
