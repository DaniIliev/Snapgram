import { useGetRecentPosts, useGetRecentUsers } from '@/lib/react-query/queryAndMutations'
import React from 'react'

export const AllUsers = () => {

  const { data: users, isPending: isUserLoading, isError: isErrorPosts } = useGetRecentUsers()

  console.log(users)
  return (
    <div className='flex flex-col w-full'>

    </div>
  )
}


export default AllUsers