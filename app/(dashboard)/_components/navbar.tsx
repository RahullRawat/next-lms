import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <div className="flex border-b bg-white h-full shadow-sm p-4">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}
