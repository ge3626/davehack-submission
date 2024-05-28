import { useUserContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={'/'}/>
      ) : (
        <div className='flex h-full'>
          <section className='h-full flex flex-1 justify-center items-center flex-col'>
            <Outlet />
          </section>

          <img 
            src="https://t4.ftcdn.net/jpg/07/11/23/13/360_F_711231316_PJgZe3Zj2wXJS0PtAHRS8aa2BjaF5tuT.jpg"
            alt="sign up page image"
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        </div>
      )}
    </>
  )
}

export default AuthLayout