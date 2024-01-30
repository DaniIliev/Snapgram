
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavedPost } from '@/lib/react-query/queryAndMutations'
import { Models } from 'appwrite'
import React, { useState } from 'react'

type PostStatsProps ={
    post: Models.Document,
    userId: string
}
const PostStats = ({post, userId}: PostStatsProps) => {
    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false);


    const {mutate: likePost} = useLikePost()
    const {mutate: savedPost} = useSavedPost()
    const {mutate: deleteSavedPost} = useDeleteSavedPost()

    const {data: currentUser} = useGetCurrentUser()

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        let newLikes = [...likes]
        const hasLiked = newLikes.includes(userId)

        if(hasLiked){
            newLikes = newLikes.filter((id) => id !== userId);
        }else{
            newLikes.push(userId)
        }

        setLikes(newLikes)
        likePost({postId: post.$id, likesArray: newLikes})
    }

    const handleSavedPost = (e: React.MouseEvent) => {
        e.stopPropagation();

        const savePostRecord = currentUser?.save.find((record: Models.Document) => 
        record.$id === post.$id)

        if(savePostRecord){
            setIsSaved(false)
            deleteSavedPost(savePostRecord.$id)
            return 
        }


        savedPost({postId: post.$id, userId})
        setIsSaved(true);
    }
  return (
    <div className='flex justify-between items-center z-20'>
        <div className='flex gap-2 mr-5'>
            <img src={`${likesList?.includes(userId) ? "/icons/liked.svg" : "/icons/like.svg" }`} 
            alt="like" 
            width={20}
            height={20}
            onClick={handleLikePost}
            className='cursor-pointer'
            />
            <p className='text-gray-400 text-small'>{likesList.length}</p>
        </div>

        <div className='flex gap-2'>
            <img src={ `${isSaved ? "/icons/saved.svg" : "/icons/save.svg"}`} 
            alt="liked" 
            width={20}
            height={20}
            onClick={handleSavedPost}
            className='cursor-pointer'
            />
        </div>
    </div>
  )
}

export default PostStats