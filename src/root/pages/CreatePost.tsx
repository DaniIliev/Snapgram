import PostForm from '@/components/forms/PostForm'
import React from 'react'

export const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5x1 flex items-center gap-3 justify-start'>
          <img
            src="/icons/add-post.svg"
            alt="addPost"
            width={36}
            height={36} />
            <h2 className='h3-bold md:h2-bold text-left w-full text-white'>Create Post</h2>
        </div>
        <PostForm />
      </div>
    </div>
  )
}

export default CreatePost