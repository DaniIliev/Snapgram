import {ID, Query} from 'appwrite'

import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';
import { useGetCurrentUser } from '../react-query/queryAndMutations';

export async function createUserAccount(user:INewUser){
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )

        if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl
    })

        return newUser
    }catch(error){
        console.log(error)
        return error
    }
}


export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl:URL,
    username?: string,
    Followers?: string,

}){
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )

        return newUser
    }catch(error){
        console.log(error)
    }
}

export async function signInAccount( user: {email: string, password: string}){
    try{
        const session = await account.createEmailSession(user.email, user.password)

        return session
    }catch(error){
        console.log(error)
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export const signOutAccount = async () => {
    try {
        const session = await account.deleteSession('current')

        return session
    } catch (error) {
        console.log(error)
    }
}

export async function createPost(post: INewPost){
    try {
        //upload image to storage
        const uploadedFile = await uploadFile(post.file[0])
        
        if(!uploadedFile) throw Error

        //Get file URL
        const fileUrl = getFilePreview(uploadedFile.$id)
        if(!fileUrl){
            deleteFile(uploadedFile.$id)
            throw Error
        }

        //convert tags to array
        const tags = post.tags?.replace(/ /g, "").split(',')

        // save to database 
        const newPost = databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if(!newPost){
            await deleteFile(uploadedFile.$id)
            throw Error
        }

        return newPost
    } catch (error) {
        console.log(error)
    }
}

export async function uploadFile(file: File){
    // console.log(file)
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        console.log('UploadedFile', uploadedFile)
        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

export function getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  }
  

export async function deleteFile(fileId: string){
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        )
        return {status: 'ok'}
    } catch (error) {
        console.log(error)
    }
}

export async function getRecentPosts(){
    const posts = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) throw Error

    return posts
}

export async function likePost(postId: string, likesArray: string[]){
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        )

        if(!updatedPost) throw Error

        return updatedPost
    } catch (error) {
        console.log(error)
    }
}

export async function savePost(postId: string, userId:string){
    try {
        const savedPost = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        )

        if(!savedPost) throw Error

        return savedPost
    } catch (error) {
        console.log(error)
    }
}

export async function deleteSavedPost(savedRecordId:string){
    try {
        const unSaved = await databases.deleteDocument(
            appwriteConfig.databaseID,
            appwriteConfig.savesCollectionId,
            savedRecordId
        )

        if(!unSaved) throw Error

        return {status: 'ok'}
    } catch (error) {
        console.log(error)
    }
}

export async function getPostById(postId: string){

    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionId,
            postId
        )
        return post
    } catch (error) {
        console.log(error)
    }
}


export async function updatePost(post: IUpdatePost){
    // console.log('post', post.file)
    const hasFileToUpdate = post.file.length > 0;

    try {

        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId
        }

        if(hasFileToUpdate){
            //upload image to storage
            const uploadedFile = await uploadFile(post.file[0])
        
            if(!uploadedFile) throw Error

                    //Get file URL
            const fileUrl = getFilePreview(uploadedFile.$id)
            if(!fileUrl){
                deleteFile(uploadedFile.$id)
                throw Error
            }

            image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
        }




        //convert tags to array
        const tags = post.tags?.replace(/ /g, "").split(',')

        // save to database 
        const updatedPost = databases.updateDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags
            }
        )

        if(!updatedPost){
            await deleteFile(post.imageId)
            throw Error
        }

        return updatedPost
    } catch (error) {
        console.log(error)
    }
}


export async function deletePost(postId:string, imageId:string){

    if(!postId || !imageId) throw Error
    
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionId,
            postId
        )

        return {status: 'ok'}
    } catch (error) {
        
    }
}

export async function getInfinitePost({pageParam}: {pageParam:number}){
    const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)]

    if(pageParam){
        queries.push(Query.cursorAfter(pageParam.toString()))
    }

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionId,
            queries
        )

        if(!posts) throw Error

        return posts
    } catch (error) {
        console.log(error)
    }
}


export async function searchPosts(searchTerm: string){

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionId,
            [Query.search('caption', searchTerm)]
        )

        if(!posts) throw Error

        return posts
    } catch (error) {
        console.log(error)
    }
}

export async function getUserById(userId: string){

    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            userId
        )
        return post
    } catch (error) {
        console.log(error)
    }
}


export async function upgradeUserInfo(user : IUpdateUser) {
        const hasFileToUpdate = user.file.length > 0
        try {
            let image = {
                imageUrl: user.imageUrl,
                imageId: user.imageId
            }

            if(hasFileToUpdate){
                const uploadedFile = await uploadFile(user.file[0])
                if(uploadedFile) throw Error

                const fileUrl = getFilePreview(uploadedFile!.$id)

                if(!fileUrl){
                    await deleteFile(uploadedFile!.$id)
                    throw Error
                }
                image = {...image, imageUrl: fileUrl, imageId: uploadedFile!.$id}
            }
            const updateUser = await databases.updateDocument(
                appwriteConfig.databaseID,
                appwriteConfig.userCollectionId,
                user.userId,
                {
                    name: user.name,
                    bio: user.bio,
                    imageUrl: image.imageUrl,
                    imageId: image.imageId
                }
            )

            if(!updateUser){
                if(hasFileToUpdate){
                    await deleteFile(image.imageId)
                }
                throw Error
            }

            if(user.imageId && hasFileToUpdate){
                await deleteFile(user.imageId)
            }
            return updateUser
        } catch (error) {
            console.log(error)
        }
}


export async function followUser(userId: string, followersArray: string[]){
    console.log(followersArray)
    try {
        const updateUser = await databases.updateDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            userId,
            {
                followers: followersArray
            }
        )

        if(!updateUser) throw Error
        console.log(updateUser)
        return updateUser
    } catch (error) {
        console.log(error)
    }
}


export async function getRecentUser(){
    const users = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!users) throw Error
      return users
}

export async function searchUsers(searchTerm: string){
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
        )
        const searchTermLength = searchTerm.length



        const searchedUsers = users.documents.filter((user) => 
            // user.name.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase(), 0) &&
            user.name.slice(0,searchTermLength).toLocaleLowerCase() === searchTerm.toLocaleLowerCase()
        )

        if(!users) throw Error

        return searchedUsers
    } catch (error) {
        console.log(error);
    }
}