import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { Categories } from './_components/categories'
import { SearchInput } from '@/components/search-input'
import { getCourses } from '@/actions/get-courses'
import { CoursesList } from '@/components/courses-list'

type SearchPageProps = {
  searchParams: {
    title: string
    categoryId: string
  }
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getCourses({
    userId,
    ...searchParams,
  })
  return (
    <>
      <div className=" block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
      <CoursesList items={courses} />
    </>
  )
}
