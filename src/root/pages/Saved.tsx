import GridPostList from "@/components/shared/GridPostList";
import { Loader } from "@/components/shared/loader";
import { useGetCurrentUser } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";

export const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  console.log(currentUser?.save);
  const savedPosts = currentUser?.save.map((savedPost: Models.Document) => ({
    ...savedPost.post,
  }));
  console.log(savedPosts);
  if (!savedPosts) return <Loader />;
  if(savedPosts.length == 0) return <h3 className="h3-bold flex items-center justify-center text-white">No saved posts</h3>
  return (
    <>
      <div className="flex flex-col items-center justify-start">
        <h1 className="h5-bold p-5 text-white">Only you can see what you've saved</h1>
        <div className="flex items-center justify-center flex-wrap">
          <GridPostList posts={savedPosts} showStats={false} showUser={false} />
        </div>
      </div>
    </>
  );
};
export default Saved;
