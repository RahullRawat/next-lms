import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    const { title } = await request.json()

    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const course = await db.course.create({
      data: {
        createdById: userId,
        title,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
