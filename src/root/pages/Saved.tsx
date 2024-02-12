import GridPostList from '@/components/shared/GridPostList'
import { Loader } from '@/components/shared/loader'
import { useGetCurrentUser } from '@/lib/react-query/queryAndMutations'
import { Models } from 'appwrite'

export const Saved = () => {
  const {data: currentUser} = useGetCurrentUser()

  console.log(currentUser?.save)
  const savedPosts = currentUser?.save.map((savedPost: Models.Document) => ({
    ...savedPost.post,

  }))
  console.log(savedPosts)
  if(!savedPosts) return <Loader />

  return (

    <GridPostList posts = {savedPosts} showStats={false} showUser={false}/>
  )
}
export default Saved