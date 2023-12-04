import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './sidebar'

export default function MobileSidebar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )
}
