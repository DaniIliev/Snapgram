import GridPostList from "@/components/shared/GridPostList";
import PostCard from "@/components/shared/PostCard";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser, useGetUserById, useGetUserPost } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import React from "react";
import { Link, useParams } from "react-router-dom";

export const Profile = (userId: string) => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserById(id || "");
  const {data: currentUser, isFetching} = useGetCurrentUser()
  
  const isOwner: boolean = id === currentUser?.$id ? true : false
  console.log(currentUser)
  if (!user || !currentUser)
    return (
      <div className="flex items-center justify-center w-full">
        <Loader />{" "}
      </div>
    );

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
                <Button>Follow</Button>
            </div>
            <div>
                {}
              <Button className=" hover:bg-violet-300">
                <Link to={"/"} className="flex items-center gap-2">
                  <img
                    src="/icons/edit.svg"
                    width={24}
                    height={24}
                    alt="editProfile"
                  />
                  Edit profile
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className=" hover:bg-violet-300">
            <Link to={"/"} className="flex gap-2 items-center">
              <img
                src="/icons/add-post.svg"
                alt="addPost"
                width={24}
                height={24}
              />
              Posts
            </Link>
          </Button>
          <Button className=" hover:bg-violet-300">
            <Link to={"/"} className="flex gap-2 items-center w-50">
              <img src="/icons/liked.svg" width={24} height={24} alt="liked" />
              Liked Posts
            </Link>
          </Button>
        </div>
      </div>
      <div>
            <GridPostList posts={currentUser?.posts} showUser={false} showStats={true}/>
     
      </div>

      </div>
    </>
  );
};
export default Profile;
