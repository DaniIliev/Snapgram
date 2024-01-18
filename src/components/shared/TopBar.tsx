import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations'
import { useUserContext } from '@/context/authContext'

function TopBar() {
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate()
    const {user} = useUserContext()

    useEffect(() => {
        if(isSuccess){
            navigate('/sign-in')
        }
    }, [isSuccess])

  return (
    <section className='sticky top-0 z-50 md:hidden bg-dark-2 w-full'>
        <div className='flex justify-between items-center py-4 px-5'>
            <Link to='/' className='flex gap-3 items-center'>
                <img src="/logo.svg" alt="logo" width={130} height={325}/>
            </Link>
            <div className='flex gap-4'>
                <Button onClick={ () => signOut}>
                    <img src="/icons/logout.svg" alt="logout" />
                </Button>
                <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                    <img src={user.imageUrl || '/profile-placeholder.svg'} alt="profile"
                    className='h-8 w-8 rounded-full' />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default TopBar