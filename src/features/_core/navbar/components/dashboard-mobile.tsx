import { Menu } from "lucide-react";

export function DashboardMobileNavbar() {
  return null;
  return (
    <div className="sticky top-0 z-50 border-b bg-white p-4">
      <div className="flex justify-between">
        <div className="flex items-center justify-between">
          <button className="flex items-center justify-center">
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
