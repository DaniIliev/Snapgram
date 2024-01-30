import PostForm from '@/components/forms/PostForm'
import { Loader } from '@/components/shared/loader';
import { useGetPostById } from '@/lib/react-query/queryAndMutations';
import React from 'react'
import { useParams } from 'react-router-dom'

export const UpdatePost = () => {

  const {id} = useParams();
  const {data: post, isPending} = useGetPostById(id || '')

  if(isPending) return <Loader />
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5x1 flex items-center gap-3 justify-start'>
          <img
            src="/icons/add-post.svg"
            alt="addPost"
            width={36}
            height={36} />
            <h2 className='h3-bold md:h2-bold text-left w-full text-white'>Edit Post</h2>
        </div>
        <PostForm action="Update" post={post}/>
      </div>
    </div>
  )
}

export default UpdatePost