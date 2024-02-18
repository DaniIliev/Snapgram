import PostCard from "@/components/shared/PostCard"
import { Loader } from "@/components/shared/loader"
import { useGetRecentPosts } from "@/lib/react-query/queryAndMutations"
import { Models } from "appwrite"


const Home = () => {
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts()
  const isLoading = true

  return (
    <div className="flex flex-1 justify-center">
      <div className='flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar'>
        <div className="flex justify-center items-center flex-col">
          {/* <h2 className="h3-bold md:h2-bold text-left w-full text-white">Home Feed</h2> */}
          {isLoading && !posts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 gap-4 w-full'>
              
                {posts?.documents.map((post: Models.Document) => (
                  <li key={post.$id}><PostCard post={post}/></li>
                ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

export default Home