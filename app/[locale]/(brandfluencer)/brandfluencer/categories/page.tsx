import Categories from '@/components/Brandfluencer/Categories/Categories'
import Title from '@/components/Brandfluencer/Title/Title'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center gap-6 items-center'>
        <Title title={"CATEGORIES"}/>
        <Categories />
    </div>
  )
}

export default page