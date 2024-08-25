import Card from '@/Components/user/Cards'
import React from 'react'
import { Input } from "@/Components/ui/input"
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";


const AllPosts = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-14'>
      <Input placeholder='Search for posts' className='w-1/2  mb-5'  />
      <Card/>

      <div className='flex justify-center items-center w-full mb-10 gap-6'>
        <button className='w-10 h-10 flex items-center justify-center rounded-full border p-2  hover:bg-blue-gray-300'>
         <GrLinkPrevious/>
        </button>

        <button className='w-10 h-10 flex items-center justify-center rounded-full border p-2 hover:bg-blue-gray-300 '>
         <GrLinkNext />
        </button>

      </div>
    </div>
  )
}

export default AllPosts
