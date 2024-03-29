import { Models } from 'appwrite'
import React from 'react'
import { Loader } from './loader'
import GridPostList from './GridPostList'

type SearchResultProps = {
  isSearchFetching: boolean,
  searchedPost: Models.Document | undefined
}

const SearchResult = ({isSearchFetching, searchedPost}: SearchResultProps) => {

  if(isSearchFetching) return <Loader />

  if(searchedPost && searchedPost.documents.length > 0){

    return(
      <GridPostList posts={searchedPost.documents} showUser={true} showStats={true}/>
    )
  }
  return (
    <p className='text-white mt-10 text-center w-full'>No result found</p>
  )
}

export default SearchResult