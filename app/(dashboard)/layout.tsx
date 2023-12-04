import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="md:pl-56 fixed inset-y-0 h-14 z-50 w-full">
        <Navbar />
      </div>
      <div className="hidden md:flex w-56 h-full flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-14 h-full">{children}</main>
    </div>
  );
}
