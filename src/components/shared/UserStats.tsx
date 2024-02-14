import { useFollowUser } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader } from "./loader";

type UserStatsProps = {
  user: Models.Document;
  userId: string;
};

const UserStats = ({ user, userId }: UserStatsProps) => {
  const followersList = user.followers?.map((id: string) => id);

  const [followers, setFollowers] = useState(followersList);
  const [hasFollowed, setHasFollowed] = useState(false)

  const { mutate: followUser, isPending: isFollowUser } = useFollowUser();

  const handleFollowUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newFollowers = [...followers];
    const hasFollowed = newFollowers.includes(userId);

    console.log(newFollowers.includes(userId));
    if (hasFollowed) {
      newFollowers = newFollowers.filter((id) => id !== userId);
    } else {
      newFollowers.push(userId);
    }
    console.log(newFollowers);
    setFollowers(newFollowers);
    followUser({ userId: user.$id, followersArray: newFollowers });
  };
  return (

    <Button
    
        onClick={handleFollowUser}
        className="bg-blue-500 hover:bg-blue-600"
    >

    {isFollowUser ? <Loader /> : 
       followers.includes(userId) ? 'Unfollow' : 'Follow'
    }
    </Button>
  );
  };

export default UserStats;
