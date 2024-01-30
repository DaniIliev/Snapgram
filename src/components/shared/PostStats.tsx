
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavedPost } from '@/lib/react-query/queryAndMutations'
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import { Loader } from './loader'

type PostStatsProps ={
    post: Models.Document,
    userId: string
}
const PostStats = ({post, userId}: PostStatsProps) => {
    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false);


    const {mutate: likePost, isPending: isLikedPost} = useLikePost()
    const {mutate: savedPost, isPending: isSavingPost} = useSavedPost()
    const {mutate: deleteSavedPost, isPending: isDeletingSaved} = useDeleteSavedPost()

    const {data: currentUser} = useGetCurrentUser()


    const savePostRecord = currentUser?.save.find((record: Models.Document) => 
    record.post.$id === post.$id)

    useEffect(() => {
        setIsSaved(!!savePostRecord)
    }, [currentUser])


    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        let newLikes = [...likes]
        const hasLiked = newLikes.includes(userId)

        console.log(newLikes.includes(userId))
        if(hasLiked){
            newLikes = newLikes.filter((id) => id !== userId);
        }else{
            newLikes.push(userId)
        }
        console.log(newLikes)
        setLikes(newLikes)
        likePost({postId: post.$id, likesArray: newLikes})
    }

    const handleSavedPost = (e: React.MouseEvent) => {
        e.stopPropagation();

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
            {isLikedPost ? <Loader /> : 
            <img src={`${likesList?.includes(userId) ? "/icons/liked.svg" : "/icons/like.svg" }`} 
            alt="like" 
            width={20}
            height={20}
            onClick={handleLikePost}
            className='cursor-pointer'
            />
            }
            <p className='text-gray-400 text-small'>{likesList.length}</p>
        </div>

        <div className='flex gap-2'>
            {isDeletingSaved || isSavingPost ? <Loader /> : 
            <img src={ `${isSaved ? "/icons/saved.svg" : "/icons/save.svg"}`} 
            alt="liked" 
            width={20}
            height={20}
            onClick={handleSavedPost}
            className='cursor-pointer'
            />
            }
        </div>
    </div>
  )
}

export default PostStats