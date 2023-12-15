'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Combobox } from '@/components/ui/combobox'

type CategoryFormProps = {
  courseId: string
  initialData: Course
  options: { label: string; value: string }[]
}

const formSchema = z.object({
  categoryId: z.string().min(1),
})

export default function CategoryForm({ courseId, initialData, options }: CategoryFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData.categoryId || '',
    },
  })

  const { isValid, isSubmitting } = form.formState

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

  const selectedOption = options.find((option) => option.value === initialData?.categoryId)

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course Category
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-4 h-4 w-4" /> Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn('mt-2 text-sm', !initialData.description && 'italic text-slate-500')}>
          {selectedOption?.label || 'No Category'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox {...field} options={options} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting || !isValid} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
