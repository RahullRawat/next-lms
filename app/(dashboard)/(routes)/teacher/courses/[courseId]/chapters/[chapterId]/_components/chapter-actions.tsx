'use client'

import { Trash } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ConfirmModal from '@/components/modals/confirm-modal'

type ChapterActionsProps = {
  disbaled: boolean
  chapterId: string
  courseId: string
  isPublished: boolean
}

export default function ChapterActions({ disbaled, chapterId, courseId, isPublished }: ChapterActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onClick() {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        toast.success('Chapter unpublished')
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success('Chapter published')
      }

      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success('Chapters deleted successfully')
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" disabled={disbaled || isLoading} onClick={onClick}>
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
