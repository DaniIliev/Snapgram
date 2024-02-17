import UserCard from "@/components/shared/UserCard";
import { Loader } from "@/components/shared/loader";
import {
  useGetCurrentUser,
  useGetRecentPosts,
  useGetRecentUsers,
} from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import React from "react";
import { Link } from "react-router-dom";

export const AllUsers = () => {
  const {
    data: users,
    isPending: isUserLoading,
    isError: isErrorUsers,
  } = useGetRecentUsers();

  const { data: currentUser, isFetching } = useGetCurrentUser();


  if(isUserLoading && isFetching){
    return <Loader /> 
  }else if(isErrorUsers){
    return <h2 className="text-white fles items-center justify-center h-2:bold">"Not found!"</h2>
  }

  return (
    <div className="flex flex-col items-center justify-evenly w-full ">
      {users?.documents.map((user: Models.Document) => (
        <UserCard user={user} key={user.$id}/> 
      ))}
    </div>
  );
};

export default AllUsers;
