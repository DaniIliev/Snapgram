import { useUserContext } from '@/context/authContext'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

type GridPostListProps = {
    posts: Models.Document[],
    showUser: boolean,
    showStats: boolean,
}
const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {

    const { user } = useUserContext()
    console.log('GridPosts', posts)

    return (
        <ul className=''>
            {posts.map((post) => (
                <li key={post.$id} className='text-white relative win-w-80 h-80'>
                    <Link to={`/post/${post.$id}`} className='flex rounded-[24px] border-black overflow-hidden cursor-pointer w-full h-full'>
                        <img src={post.imageUrl} alt='post' className='h-full w-full object-cover' />
                    </Link>
                    <div className=' absolute bottom-0 p-3 flex justify-between w-full bg-gradient-to-t from-dark-3 to-transparent rounded-b-[24px] gap-2'>
                            {showUser && (
                                <div className='flex gap-2 justify-start items-center flex-1'>
                                    <img src={post.creator.imageUrl}
                                        alt='creator'
                                        className='h-8 w-8 rounded-full' />
                                    <p className='line-clamp-1'>{post.creator.name}</p>
                                </div>
                            )}
        
                            {showStats && <PostStats post={post} userId={user.id}/>}
                    </div>
                </li>


            ))}
        </ul>
    )
}

export default GridPostList