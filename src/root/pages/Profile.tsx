import GridPostList from "@/components/shared/GridPostList";
import PostCard from "@/components/shared/PostCard";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import {
  useGetCurrentUser,
  useGetUserById,
} from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LikedPost from "./LikedPost";

export const Profile = (userId: string) => {
  const { id } = useParams();
  const {pathname} = useLocation()
  const { data: user, isPending } = useGetUserById(id || "");
  const { data: currentUser, isFetching } = useGetCurrentUser();
  

  const isOwner: boolean = id === currentUser?.$id ? true : false;
  const isActive: boolean = `/profile/${id}` == pathname ? true : false 
  console.log(user?.liked);
  if (!user || !currentUser)
    return (
      <div className="flex items-center justify-center w-full">
        <Loader />
      </div>
    );

  const showLikedPost = () => {
    return <LikedPost likedPosts={user?.liked}/>
  }

  return (
    <>
      <div className="text-white flex justify-start items-center flex-col py-4">
        <div className="flex flex-col items-center justify-start w-full py-20 border-black pr-20 pl-20 rounded-3xl gap-3">
          <div className="flex gap-3 items-center">
            <img
              src={user.imageUrl}
              alt="user"
              width={70}
              height={70}
              className="rounded-full"
            />
            <div className="flex items-center gap-10">
              <div>
                <h2 className="h2-bold text-white ">{user.name}</h2>
                <p className="text-zinc-400">@{user.username}</p>
              </div>
              <div>
              </div>
              <div>
                {isOwner ? (
                  <Button className="hover:bg-violet-300">
                    <Link to={`/update-profile/${currentUser.$id}`} className="flex items-center gap-2">
                      <img
                        src="/icons/edit.svg"
                        width={24}
                        height={24}
                        alt="editProfile"
                      />
                      Edit profile
                    </Link>
                  </Button>
                ): (
                    <Button onClick={() => console.log('Follow')} className="bg-blue-500 hover:bg-blue-600">
                        Follow
                    </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className={`hover:bg-violet-300 ${isActive && 'bg-violet-300' }`}>
              <Link to={`/profile/${id}`} className="flex gap-2 items-center">
                <img
                  src="/icons/add-post.svg"
                  alt="addPost"
                  width={24}
                  height={24}
                />
                Posts
              </Link>
            </Button>
            <Button className={`hover:bg-violet-300  }`} onClick={showLikedPost}>
              <Link to={`/profile/${id}/likedPosts`} className="flex gap-2 items-center w-50">
                <img
                  src="/icons/liked.svg"
                  width={24}
                  height={24}
                  alt="liked"
                />
                Liked Posts
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <GridPostList
            posts={currentUser?.posts}
            showUser={false}
            showStats={true}
          />
        </div>
      </div>
    </>
  );
};
export default Profile;
