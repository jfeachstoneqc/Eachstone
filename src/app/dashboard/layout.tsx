import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background dark">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r lg:block">
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-lg font-semibold">Eachstone</span>
        </div>
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
