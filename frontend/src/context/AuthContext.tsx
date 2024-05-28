import { IUser } from '@/lib/types';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const INITIAL_USER = {
  id: '',
  username: '',
  email: '',
  profile_img: '',
  signup_date: '',
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsLoading: () => {},
  setIsAuthenticated: () => {},
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.defaults.withCredentials = true;
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/session`)
    .then(res => {
      if(res.data.valid) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      } else {
        console.error("failed to fetch user from session");
      }
    })
    .catch(err => console.log(err));
    setIsLoading(false)
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);