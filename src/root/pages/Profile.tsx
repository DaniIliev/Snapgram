import GridPostList from "@/components/shared/GridPostList";
import PostCard from "@/components/shared/PostCard";
import UserStats from "@/components/shared/UserStats";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { saveUserToDB } from "@/lib/appwrite/api";
import {
  useGetCurrentUser,
  useGetUserById,
} from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export const Profile = (userId: string) => {
  const [showPosts, setShowPosts] = useState<boolean>(true);
  const [showLikedPost, setShowLikedPosts] = useState<boolean>(false);

  const { id } = useParams();
  const { data: user, isPending } = useGetUserById(id || "");
  const { data: currentUser, isFetching } = useGetCurrentUser();

  
  
  const isOwner: boolean = id === currentUser?.$id ? true : false;
  
  const showLikedPostHandler = () => {
    setShowLikedPosts(true);
    setShowPosts(false);
  };

  const showUserPosts = () => {
    setShowPosts(true);
    setShowLikedPosts(false);
  };


  if (!user || !currentUser)
    return (
      <div className="flex items-center justify-center w-full">
        <Loader />
      </div>
    );
    // console.log(user)
  return (
    <>
      <div className="text-white flex justify-start items-center flex-col py-4">
        <div className="flex flex-col items-center justify-start w-full py-20 border-black pr-20 pl-20 rounded-3xl gap-3">
          <div className="flex gap-5 items-center">
            <img
              src={user.imageUrl}
              alt="user"
              width={100}
              height={100}
              className="rounded-full"
            />

            <div className="flex items-center gap-10">
              <div>
                <h2 className="h2-bold text-white ">{user.name}</h2>
                <p className="text-zinc-400">@{user.username}</p>
                <div className="flex gap-10 p-2 items-center">
                  <p className="text-white text-center">Posts: {user?.posts.length}</p>
                  <p className="text-white">Followers: {user?.followers.length}</p>
                  <p className="text-white">Folllowing: </p>
                </div>
              </div>

              <div>
                {isOwner ? (
                  <Button className="hover:bg-violet-300">
                    <Link
                      to={`/update-profile/${currentUser.$id}`}
                      className="flex items-center gap-2"
                    >
                      <img
                        src="/icons/edit.svg"
                        width={24}
                        height={24}
                        alt="editProfile"
                      />
                      Edit profile
                    </Link>
                  </Button>
                ) : (
                  <UserStats user={user} userId={currentUser.$id}/> 
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className={`hover:bg-violet-300 ${
                showPosts && "bg-violet-300"
              } flex gap-2 items-center w-50`}
              onClick={showUserPosts}
            >
              <img
                src="/icons/add-post.svg"
                alt="addPost"
                width={24}
                height={24}
              />
              Posts
            </Button>
            <Button
              className={`hover:bg-violet-300  ${
                showLikedPost && "bg-violet-300"
              } flex gap-2 items-center w-50`}
              onClick={showLikedPostHandler}
            >
              <img src="/icons/liked.svg" width={24} height={24} alt="liked" />
              Liked Posts
            </Button>
          </div>
        </div>

        {user.posts.length == 0 && showPosts? <h3 className="h3-bold flex items-center justify-center text-white">No posts uploaded</h3> : ''}
        {user.liked.length == 0 && showLikedPost ? <h3 className="h3-bold flex items-center justify-center text-white">No liked Posts</h3> : ''}

        {showPosts &&(
          <GridPostList
            posts={user?.posts}
            showUser={false}
            showStats={true}
          />
        )}
        {showLikedPost && (
          <GridPostList
            posts={user.liked}
            showUser={false}
            showStats={false}
          />
        )}
      </div>
    </>
  );
};
export default Profile;
