import { Models } from 'appwrite'
import React from 'react'

type PostStatsProps ={
    post: Models.Document,
    userId: string
}
const PostStats = ({post, userId}: PostStatsProps) => {
  return (
    <div className='flex justify-between items-center z-20'>
        <div className='flex gap-2 mr-5'>
            <img src="/icons/like.svg" 
            alt="like" 
            width={20}
            height={20}
            onClick={() => {}}
            className='cursor-pointer'
            />
            <p className='text-gray-400 text-small'>0</p>
        </div>

        <div className='flex gap-2'>
            <img src="/icons/save.svg" 
            alt="liked" 
            width={20}
            height={20}
            onClick={() => {}}
            className='cursor-pointer'
            />
        </div>
    </div>
  )
}

export default PostStats