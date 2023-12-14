'use client'

import { useState } from 'react'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import * as z from 'zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'

type ImageFormProps = {
  courseId: string
  initialData: Course
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Description is required',
  }),
})

export default function ImageForm({ courseId, initialData }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Course Updated')
      setIsEditing(false)
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course Image
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="w4 mr-2 h-4" /> Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="mr-4 h-4 w-4" /> Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image alt="Upload" src={initialData.imageUrl} fill className="rounded-md object-cover" />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  )
}
