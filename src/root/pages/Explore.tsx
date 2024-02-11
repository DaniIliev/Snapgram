import GridPostList from '@/components/shared/GridPostList';
import SearchResult from '@/components/shared/SearchResult';
import { Loader } from '@/components/shared/loader';
import { Input } from '@/components/ui/input'
import { useGetPosts, useSearchPost } from '@/lib/react-query/queryAndMutations';
import { useState } from 'react'

export const Explore = () => {
    const [searchValue, setSearchValue] = useState('')

    const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()
    const { data: searchPosts, isFetching: isSearchFetching } = useSearchPost(searchValue)

    if (!posts) {
        return (
            <div className='flex items-center justify-center w-full h-full'>
                <Loader />
            </div>
        )
    }

    console.log(posts)
    const shouldShowSearchResults = searchValue !== "";
    const shouldShowPosts = !shouldShowSearchResults &&
        posts.pages.every((item) => item!.documents.length === 0);

    return (
        <div className='flex flex-col items-center  overflow-scroll py-10 px-5 md:p-14 custom-scrollbar'>
            <div className='max-w-5xl flex  flex-col items-center w-full gap-6 md:gap-9'>
                <h2 className='text-white h3-bold md:h2-bold w-full'>Search posts</h2>
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
            </div>
            <div className='flex justify-between items-center w-full max-w-5xl mt:16 mb:7'>
                <h3 className='text-white body-bold md:h3-bold mt-7'>Popular Today</h3>
                <div className='flex gap-2 mt-7'>
                    <p className='small-medium mb:base-medium text-white'>All</p>
                    <img src="/icons/filter.svg"
                        alt="filter"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            <div className='flex md:flex-col gap-9 w-full max-w-5xl'>
                {shouldShowSearchResults ? (
                    <SearchResult
                        isSearchFetching={isSearchFetching}
                        searchedPost={searchPosts}
                    />
                ) : shouldShowPosts ? (
                    <p className='text-zinc-200 mt-10 text-center w-full'>End of posts</p>
                ) : posts.pages.map((item, index) => (
                    <GridPostList key={index} posts={item!.documents} />
                ))}

            </div>
            {/* {hasNextPage && !searchValue && (
                <div ref={ref} className='mt-10'>
                    <Loader />
                </div>
            )} */}
        </div>
    )
}

export default Explore