import { bottombarLinks } from '@/constants'
import { INavLink } from '@/types'
import { Link, useLocation } from 'react-router-dom'

export const BotomBar = () => {

  const { pathname } = useLocation()
  return (
    <section className=' z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden'>
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
            <Link
              key={link.imgURL}
              to={link.route}
              className={`flex flex-col justify-center items-center p-2 gap-1 transition text-white ${isActive &&
                'bg-violet-300 border-ra rounded-[10px]'}`}
            >
              <img src={link.imgURL}
                alt={link.label}
                width={18}
                height={18}
              // className=' group-hover:invert brightness-0 transition'
              />
             <p className='tiny-medium text-white'>{link.label}</p> 
            </Link>

        )
      })}
    </section>
  )
}
