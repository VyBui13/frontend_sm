import Header from "@/components/Header";
import AuthGuard from "./AuthGuard";
import Sidebar from "@/components/Sidebar";
import SidebarReal from "./Dashboard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen w-screen">
        <SidebarReal />
        <div className="right flex-1 bg-[var(--text-in-background-color)] flex flex-col">
          <div className="header w-full">
            <Header />
          </div>
          <div className="content flex-1 p-4 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
