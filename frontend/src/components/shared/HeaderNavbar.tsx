import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'
import SettingSidebar from './SettingSidebar'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

const HeaderNavbar = () => {
  const { user } = useUserContext();
  const { mutateAsync: signOutAccount } = useSignOutAccount();

  const handleClick = () => {
    signOutAccount();
  }
  return (
    <nav className='flex w-full items-center justify-between bg-white py-2 px-4 border-b-2 select-none'>
        <div className='flex gap-8 items-center'>
            <h1 className='font-bold text-[24px]'>IntellectDuo</h1>
            <ul className='flex gap-4 font-semibold'>
                <Link to='/'>Home</Link>
                <Link to='/media'>Media</Link>
                <Link to='/ranking'>Ranking</Link>
                <Link to='/new-thread'>Ask Question</Link>
                <Link to='/my-quizzes'>Review Quizzes</Link>
            </ul>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='font-bold bg-orange-500 p-2 rounded-xl'>
            <Link to='/quizgame' >Play Quiz</Link>
          </div>
          <SettingSidebar />
          <Avatar>
            <AvatarImage src={user.profile_img ? user.profile_img : import.meta.env.VITE_DEFAULT_PIMG}/>
          </Avatar>
          <span className='font-semibold'>Welcome, {user.username}</span>
          <Button onClick={handleClick}>Sign Out</Button>
        </div>

    </nav>
  )
}

export default HeaderNavbar