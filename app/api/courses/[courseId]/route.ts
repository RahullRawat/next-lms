import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import Mux from '@mux/mux-node'
import { db } from '@/lib/db'

const { Video } = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!)

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

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string } }) {
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
      return new NextResponse('Not found', { status: 404 })
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData) {
        await Video.Assets.del(chapter.muxData.assetId)
      }
    }

    const deletedCourse = await db.course.delete({ where: { id: params.courseId } })
    return NextResponse.json(deletedCourse)
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
