import { Models } from "appwrite";
import React from "react";
import { Link } from "react-router-dom";
import UserStats from "./UserStats";
import { useGetCurrentUser } from "@/lib/react-query/queryAndMutations";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user}: UserCardProps) => {

  const { data: currentUser, isFetching } = useGetCurrentUser();

  return (

    <div className="flex justify-between items-center border-black p-4 rounded-2xl w-96 bg-neutral-700">
      <Link to={`/profile/${user.$id}`} className="flex items-center gap-3">
        <img
          src={user?.imageUrl || "/icons/profile-placeholder.svg"}
          alt="profile-image"
          className="rounded-full w-12 lg:h-12"
        />
        <div className="flex flex-col text-white ">
          <p className="base-medium lg:body-bold text-white">{user?.name}</p>
        </div>
      </Link>

        <UserStats user={user} userId={currentUser!.$id}/> 

    </div>
  );
};

export default UserCard;
