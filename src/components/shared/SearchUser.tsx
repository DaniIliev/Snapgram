import { Models } from 'appwrite'
import { Loader } from './loader'
import UserCard from './UserCard'

type SearchResultProps = {
    isSearchFetching: boolean,
    searchedUser: Models.Document[] | undefined
}

const SearchedUser = ({ isSearchFetching, searchedUser }: SearchResultProps) => {

    if (isSearchFetching) return <Loader />

    if (searchedUser && searchedUser?.length > 0) {

        console.log(searchedUser)
        return (
            searchedUser?.map((user: Models.Document) => (
                <UserCard user={user} key={user.$id} />
              ))
        )
    }
    return (
        <p className='text-white mt-10 text-center w-full'>No result found</p>
    )
}



export default SearchedUser