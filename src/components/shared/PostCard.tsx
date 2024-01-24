import { useUserContext } from '@/context/authContext'
import { formatTimeAgo } from '@/lib/utils'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'

type PostCardProps = {
    post: Models.Document
}


const PostCard = ({ post }: PostCardProps) => {

    const {user} = useUserContext();

    return (
        <div className=' bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={post?.creator?.imageUrl || '/icons/profile-placeholder.svg'}
                            alt="profile-image"
                            className='rounded-full w-12 lg:h-12' 
                            />
                    </Link>
                    <div className='flex flex-col text-white'>
                        <p className='base-medium lg:body-bold text-white'>
                            {post.creator.name}
                        </p>
                        <div className='flex justify-center items-center gap-2 text-slate-400'>
                            <p>
                                {formatTimeAgo(post.$createdAt)}
                            </p>
                            -
                            <p>{post.location}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/update-post/${post.$id}`}
                    className={`${user.id !== post.creator.$id && "hidden"}`}
                >
                    <img src="/icons/edit.svg" alt="edit" width={20} height={20}/>
                </Link>
            </div>
            <Link to={`/post/${post.$id}`}>
                <div className='small-medium lg:base-medium py-5'>
                    <p>{post.caption}</p>
                    <ul className='flex gap-1 mt-2'>
                        {post.tags.map((tag: string)  => (
                            <li key={tag} className='text-white'>
                                #{tag}
                            </li>
                        ))}
                    </ul>   
                </div>
                <img 
                src={post.imageUrl || 'icons/profile-placeholder.svg'}
                className=' h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5' 
                alt="postImage" />
            </Link>
        </div>
    )
}

export default PostCard