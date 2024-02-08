import { useGetPostById } from "@/lib/react-query/queryAndMutations";
import { formatTimeAgo } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  const handleDelete = () => {
    
  }
  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <div>
          <img src={post?.imageUrl} alt="post" className='h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5' />
          <div className="flex items-center gap-3 ">
            <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3 lg:w-4/5">
              <img
                src={
                  post?.creator?.imageUrl || "/icons/profile-placeholder.svg"
                }
                alt="profile-image"
                className=" rounded-full w-12 lg:h-12"
              />
              <div className="flex flex-col text-white">
                <p className="base-medium lg:body-bold text-white">
                  {post?.creator.name}
                </p>
                <div className="flex justify-center items-center gap-2 text-slate-400">
                  <p>{formatTimeAgo(post?.$createdAt)}</p>-<p>{post?.location}</p>
                </div>
              </div>
            </Link>
            <div className="flex gap-3 items-center">
                <Link to={`/update-post/${post?.$id}`}>
                  <img src="/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>
                <Link to="">
                <img src="/icons/delete.svg" alt="delete" width={24} height={24}/>
                </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PostDetails;
