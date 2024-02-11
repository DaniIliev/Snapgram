import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations'
import { sidebarLinks } from '@/constants'
import { useUserContext } from '@/context/authContext'
import { INavLink } from '@/types'

function LeftSideBar() {
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { user } = useUserContext()

    useEffect(() => {
        if (isSuccess) {
            navigate('/sign-in')
        }
    }, [isSuccess])
    return (
        <nav className=' bg-neutral-700 hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2'>
            <div className='flex flex-col gap-11'>
                <Link to='/' className='flex gap-3 items-center'>
                    <img src="/logo.svg" alt="logo" width={170} height={36} />
                </Link>

                <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img src={user.imageUrl || '/profile-placeholder.svg'}
                        alt="profile"
                        className='h-14 w-14 rounded-full' />
                    <div className='flex flex-col'>
                        <p className='body-bold text-white'>
                            {user.name}
                        </p>
                        <p className='small-regular text-slate-400 '>
                            @{user.username}
                        </p>
                    </div>
                </Link>

                <ul className=' flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li className={`leftsidebar-link ${isActive &&
                                'bg-violet-300 border-ra rounded-md'}`}
                                key={link.label}>
                                <NavLink
                                    to={link.route}
                                    className='flex gap-4 items-center rounded-md pl-4 py-4 text-white hover:bg-violet-300 border-ra rounded-e-lg'
                                >
                                    <img src={link.imgURL}
                                        alt={link.label}
                                    // className=' group-hover:invert brightness-0 transition'
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <Button onClick={() => signOut()} className='flex gap-4 items-center justify-start hover:bg-violet-300'>
                <img src="/icons/logout.svg" alt="logout" />
                <p className='small-medium lg:base-medium'>Logout</p>
            </Button>
        </nav>
    )
}
export default LeftSideBar