import SearchedUser from "@/components/shared/Searchuser";
import UserCard from "@/components/shared/UserCard";
import { Loader } from "@/components/shared/loader";
import { Input } from "@/components/ui/input";
import {
  useGetCurrentUser,
  useGetRecentPosts,
  useGetRecentUsers,
  useSearchUser,
} from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AllUsers = () => {
  const [searchValue, setSearchValue] = useState('')
  const {
    data: users,
    isPending: isUserLoading,
    isError: isErrorUsers,
  } = useGetRecentUsers();

  const { data: currentUser, isFetching } = useGetCurrentUser();
  const {data: searchedUser, isFetching: isUsersFetching} = useSearchUser(searchValue)

  if (isUserLoading && isFetching) {
    return <Loader />
  } else if (isErrorUsers) {
    return <h2 className="text-white fles items-center justify-center h-2:bold">"Not found!"</h2>
  }

  const shouldShowSearchResults = searchValue !== "";

  return (
    <div className="flex flex-col items-center justify-evenly w-full ">
      <div className='flex gap-1 px-4 w-96 rounded-lg bg-zinc-400'>
        <img src="/icons/search.svg"
          alt="search"

          width={24}
          height={24} />
        <Input
          type='text'
          placeholder='Search...'
          className='h-12 border-none bg-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

      </div>
      {shouldShowSearchResults ? (
          <SearchedUser isSearchFetching={isUsersFetching} searchedUser={searchedUser} />
      ):(
        users?.documents.map((user: Models.Document) => (
          <UserCard user={user} key={user.$id} />
        ))
      )}
 
    </div>
  );
};

export default AllUsers;
