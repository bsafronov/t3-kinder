import { IntroNavbar } from "../../navbar";
import { IntroSidebar } from "../../sidebar";

export function IntroLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <IntroNavbar />
      <div className="flex">
        <IntroSidebar />
        {children}
      </div>
    </>
  );
}
