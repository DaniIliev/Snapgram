import UserCard from "@/components/shared/UserCard";
import {
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
    isError: isErrorPosts,
  } = useGetRecentUsers();

  return (
    <div className="flex flex-col w-full gap-6">
      {users?.documents.map((user: Models.Document) => (
        <UserCard user={user}/> 
      ))}
    </div>
  );
};

export default AllUsers;
