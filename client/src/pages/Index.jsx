import BlogCard from '@/components/BlogCard'
import { Card } from '@/components/ui/card'
import React from 'react'

function Index() {
  return (
    <Card className={'mx-2 mt-24 w-[98%] grid grid-cols-3 gap-5 place-items-center px-5'}>
      <BlogCard />
    </Card>
  )
}

export default Index