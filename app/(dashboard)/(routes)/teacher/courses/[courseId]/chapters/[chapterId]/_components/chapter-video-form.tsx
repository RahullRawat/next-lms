'use client'

import { useState } from 'react'
import { Pencil, PlusCircle, Video } from 'lucide-react'
import * as z from 'zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter, MuxData } from '@prisma/client'
import MuxPlayer from '@mux/mux-player-react'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'

type ChapterVideoFormProps = {
  initialData: Chapter & { muxData?: MuxData | null }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
})

export default function ChapterVideoForm({ courseId, initialData, chapterId }: ChapterVideoFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success('Chapter Updated')
      setIsEditing(false)
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter Video
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="w4 mr-2 h-4" /> Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-4 h-4 w-4" /> Edit Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <MuxPlayer playbackId={initialData.muxData?.playbackId || ''} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">Upload this chapter&apos;s videos</div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div>Videos can take few minutes to process. Refresh the page if video does not appear</div>
      )}
    </div>
  )
}
