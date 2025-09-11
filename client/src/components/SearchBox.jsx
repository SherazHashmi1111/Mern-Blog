import React from 'react'
import { Input } from './ui/input'

function SearchBox() {
  return (
    <form action="">
        <Input type="text" placeholder="Search Here..." className="h-9 rounded-full bg-gray-50" />
    </form>
  )
}

export default SearchBox