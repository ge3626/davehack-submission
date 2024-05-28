import { useMutation } from '@tanstack/react-query'
import { INewComment, INewThread, ISignInType, ISignUpType } from '../types';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useCreateAccount= () => {
    const navigate = useNavigate();
    const { setIsLoading } = useUserContext();

    return useMutation({
        mutationFn: async (newUser: ISignUpType) => {
            setIsLoading(true);
            const response = await fetch(`${BACKEND_URL}/user/register`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                },
                credentials: 'include'
            });
            
            setIsLoading(false);

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }
            return response.json();
        },
        onSuccess: (data) => {
            if(data.isSuccess) {
                navigate('/');
            } else {
                alert(data.message || "Signing Up failed.");
            }
            console.log(data);
        },
        onError: (error) => {
            alert(error.message);  
        }
    });
}

export const useSignInAccount = () => {
    const navigate = useNavigate();
    const { setIsLoading } = useUserContext();

    return useMutation({
        mutationFn: async (values: ISignInType) => {
            setIsLoading(true);
            const response = await fetch(`${BACKEND_URL}/user/login`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            setIsLoading(false);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }
            return response.json();
        },
        onSuccess: (data) => {
            if (data.isLoggedIn) {
                navigate('/'); 
            } else {
                alert(data.message || "Login failed");
            }
            console.log(data);
        },
        onError: (error) => {
            alert(error.message);  
        }
    });
};

export const useSignOutAccount = () => {
    const navigate = useNavigate();
    const { setUser, setIsAuthenticated, setIsLoading } = useUserContext();

    return useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            const response = await fetch(`${BACKEND_URL}/user/logout`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            setIsLoading(false);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }
            return response.json();
        },
        onSuccess: (data) => {
            if (data.isLoggedOut) {
                setUser({
                    id:'',
                    username: '',
                    email: '',
                    profile_img: '',
                    signup_date: '',
                });
                setIsAuthenticated(false);
                navigate('/sign-in'); 
            } else {
                alert(data.message || "Signing Out failed.");
            }
        },
        onError: (error) => {
            alert(error.message);  
        }
    });
}

export const useCreateThread = () => {
    const navigate = useNavigate();
    const { user, setIsLoading } = useUserContext();
    return useMutation({
        mutationFn: async (values: INewThread) => {
            console.log(values)
            setIsLoading(true);
            const response = await axios.post(`${BACKEND_URL}/thread/user/${user.id}`, values)
            setIsLoading(false);
            return response.data;
        },
        onSuccess: (data) => {
            if(data.isSuccess) {
                navigate('/media');
            } else {
                alert(data.message || "Failed to create new thread.");
            }
        },
        onError: (error) => {
            alert(error.message);
        }
    });
}

export const useCreateComment = () => {
    const navigate = useNavigate();
    const { setIsLoading } = useUserContext();
    return useMutation({
        mutationFn: async (values: INewComment) => {
            console.log(values)
            setIsLoading(true);
            const response = await axios.post(`${BACKEND_URL}/comment/`, values)
            setIsLoading(false);
            return response.data;
        },
        onSuccess: (data) => {
            if(data.isSuccess) {
               navigate('/media');
            } else {
                alert("Failed to create new thread.");
            }
        },
        onError: (error) => {
            alert(error.message);
        }
    });
}