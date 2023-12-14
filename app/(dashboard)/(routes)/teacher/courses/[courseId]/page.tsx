import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'
import { db } from '@/lib/db'
import { IconBadge } from '@/components/icon-badge'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'

export default async function CourseIdPage({ params }: { params: { courseId: string } }) {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  })

  if (!course) {
    redirect('/')
  }

  const requiredFields = [course.title, course.description, course.imageUrl, course.price, course.categoryId]
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${requiredFields.length})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm courseId={params.courseId} initialData={course} />
          <DescriptionForm courseId={params.courseId} initialData={course} />
          <ImageForm courseId={params.courseId} initialData={course} />
        </div>
      </div>
    </div>
  )
}
