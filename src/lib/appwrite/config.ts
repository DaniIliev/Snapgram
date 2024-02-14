import {Client, Account, Databases, Storage, Avatars} from 'appwrite'
import * as env from '../../../env'


export const appwriteConfig =  {
    projectID: env.VITE_APPRITE_PROJECT_ID,
    URL: env.VITE_APPRITE_URL,
    databaseID: env.VITE_APPRITE_DATABASE_ID,
    storageId: env.VITE_APPRITE_STORAGE_ID,
    userCollectionId: env.VITE_APPRITE_USER_COLLECTION_ID,
    postCollectionId: env.VITE_APPRITE_POST_COLLECTION_ID,
    savesCollectionId: env.VITE_APPRITE_SAVES_COLLECTION_ID,
    followersCollectionId: env.VITE_APPRITE_FOLLOWERS_COLLECTION_ID
}

export const client = new Client()

client.setProject(appwriteConfig.projectID)
client.setEndpoint(appwriteConfig.URL)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)