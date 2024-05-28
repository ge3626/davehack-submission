import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { IFollowing } from '@/lib/types';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import axios from 'axios';
import { useUserContext } from '@/context/AuthContext';

interface Props {
    following: IFollowing[];
    setIsFollowingDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowingDialog = ({ following, setIsFollowingDialogOpen } : Props) => {
    const { user } = useUserContext();

    const handleUnfollow = async (followed_user_id : string) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/follows/unfollow`, {
            params: {
                following_user_id: followed_user_id,
                followed_user_id: user.id
            }
        });
        setIsFollowingDialogOpen(false);
    }
    
  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
        </DialogHeader>
        <div className='w-full px-2s'>
            {following && (
                following.map((user, index) => (
                    <div key={index} className='flex justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='w-[42px] h-[42px]'>
                                <AvatarImage src={user.profile_img || "https://github.com/shadcn.png"} />
                            </Avatar>
                            <span>{user.username}</span>
                        </div>
                        <Button onClick={() => handleUnfollow(user.following_user_id)}>Unfollow</Button>
                    </div>
                ))
            )}
        </div>
    </DialogContent>
  )
}

export default FollowingDialog