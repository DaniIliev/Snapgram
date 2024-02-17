import { Models } from "appwrite";
import React from "react";
import { Link } from "react-router-dom";
type UserCardProps = {
  user: Models.Document;
};
const UserCard = ({ user }: UserCardProps) => {
  return (

    <div className="flex items-center gap-3 border-black p-4 rounded-2xl w-96 bg-neutral-800">
      <Link to={`/profile/${user.$id}`}>
        <img
          src={user?.imageUrl || "/icons/profile-placeholder.svg"}
          alt="profile-image"
          className="rounded-full w-12 lg:h-12"
        />
      </Link>
      <div className="flex flex-col text-white">
        <p className="base-medium lg:body-bold text-white">{user?.name}</p>
      </div>
    </div>
  );
};

export default UserCard;
