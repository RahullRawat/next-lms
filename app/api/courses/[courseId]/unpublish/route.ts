import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId },
      include: { chapters: { include: { muxData: true } } },
    })

    if (!course) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const unPublishedCourse = await db.course.update({ where: { id: params.courseId }, data: { isPublished: false } })
    return NextResponse.json(unPublishedCourse)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
