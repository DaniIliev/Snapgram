import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/authContext";
import { useGetPostById } from "@/lib/react-query/queryAndMutations";
import { formatTimeAgo } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export const PostDetails = () => {
    const { id } = useParams();
    const { data: post, isPending } = useGetPostById(id || "");
    const { user } = useUserContext()

    const handleDelete = () => {

    }

    return (
        <div className=" flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center ">
            {isPending ? (
                <Loader />
            ) : (
                <div className="flex flex-col w-full max-w-5xl rounded-[30px] ">
                    <img src={post?.imageUrl} alt="post" className='h-64 xs:h-[400px] lg:h-[450px] w-full p-2 rounded-3xl  object-cover mb-5' />
                    <div className="flex  justify-between items-center gap-3 pb-7 ml-2 ">
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
                                    <p>{formatTimeAgo(post!.$createdAt)}</p>-<p>{post?.location}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="flex gap-3 items-center pr-2">
                            {user.id == post?.creator.$id && (
                                <>
                                    <Link to={`/update-post/${post?.$id}`}>
                                        <img src="/icons/edit.svg" alt="edit" width={24} height={24} />
                                    </Link>
                                    <Link to="">
                                        <img src="/icons/delete.svg" alt="delete" width={24} height={24} />
                                    </Link>
                                </>
                            )}

                        </div>
                    </div>
                    <hr className="border w-full border-white" />
                    <div className='small-medium lg:base-medium p-5'>
                        <p className='text-white'>{post?.caption}</p>
                        <ul className='flex gap-1 mt-2'>
                            {post?.tags.length > 0 && post?.tags.map((tag: string) => (
                                <li key={tag} className='text-zinc-400'>
                                    #{tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mr-6 ml-6 mb-6">
                        <PostStats post={post!}  userId={user.id}/>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PostDetails;
