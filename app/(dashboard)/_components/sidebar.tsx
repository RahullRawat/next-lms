import Logo from './logo'
import SidebarRoutes from './sidebar-routes'

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="p-4">
        <Logo />
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  )
}
