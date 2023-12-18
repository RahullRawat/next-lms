import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

type Params = { chapterId: string; courseId: string }

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { userId } = await auth()
    const { isPublished, ...values } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const ownCourse = await db.course.findUnique({ where: { id: params.courseId, createdById: userId } })
    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chapter = await db.chapter.update({ where: { id: params.chapterId }, data: { ...values } })

    return NextResponse.json(chapter)
  } catch {
    return new NextResponse('Internal server error', { status: 500 })
  }
}
