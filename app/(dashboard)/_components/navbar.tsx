import NavbarRoutes from '@/components/navbar-routes'
import MobileSidebar from './mobile-sidebar'

export default function Navbar() {
  return (
    <div className="flex h-full border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}
