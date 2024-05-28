import { Navigate, Outlet } from 'react-router-dom'
import { HeaderNavbar } from '@/components'
import { useUserContext } from '@/context/AuthContext'

const RootLayout = () => {
  const { isAuthenticated } = useUserContext();
  
  return (
    <>
      {isAuthenticated? (
          <>
              <HeaderNavbar />
              
              <section>
                <Outlet />
              </section>
          </>
      ) : (
        <Navigate to='/sign-in'/>
      )}
    </>
  );
}

export default RootLayout