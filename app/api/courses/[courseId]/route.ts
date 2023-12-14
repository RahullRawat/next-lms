import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth()
    const values = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(course)
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
