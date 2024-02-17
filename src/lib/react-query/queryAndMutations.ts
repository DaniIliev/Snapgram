import { INewPost, INewUser, IUpdatePost } from '@/types'
import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query'
import { createPost, createUserAccount, deletePost, deleteSavedPost, followUser, getCurrentUser, getInfinitePost, getPostById, getRecentPosts, getRecentUser, getUserById, getUserPosts, likePost, savePost, searchPosts, searchUsers, signInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {email: string, password: string}) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, likesArray}: {postId: string; likesArray: string[]}) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useFollowUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({userId, followersArray}: {userId: string; followersArray: string[]}) => followUser(userId, followersArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GETUSERBYID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useSavedPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, userId}: {postId: string; userId: string}) => savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({postId, imageId} :{postId:string, imageId: string} ) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetPosts = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: getInfinitePost,
        getNextPageParam: (lastPage) => {
            if(lastPage && lastPage.documents.length === 0) return 0
            const lastId = lastPage?.documents[lastPage?.documents.length -1].$id

            return lastId
        }
    })
}


export const useSearchPost = (searchTerm: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POST],
        queryFn: () => searchPosts(searchTerm),
        //automatically refech when the search term is change
        enabled: !!searchTerm
    })
}


export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey:[QUERY_KEYS.GETUSERBYID, userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId
    })
}

export const useGetRecentUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_USERS],
        queryFn: getRecentUser
    })
}

export const useSearchUser = (searchTerm: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_USER],
        queryFn: () => searchUsers(searchTerm),
        //automatically refech when the search term is change
        enabled: !!searchTerm
    })
}