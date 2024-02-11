import { useUserContext } from '@/context/authContext'
import { Models } from 'appwrite'
import React from 'react'

type GridPostListProps = {
    posts: Models.Document[]
}
const GridPostList = ({posts}: GridPostListProps) => {

    const {user} = useUserContext()
    console.log('GridPosts', posts)

  return (
    <ul className=''>
        {posts.map((post) => (
            <li className='text-white'>{post.caption}</li>
        ))}
    </ul>
  )
}

export default GridPostList