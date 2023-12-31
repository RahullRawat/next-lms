import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Courses() {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>Create Course</Button>
      </Link>
    </div>
  )
}
