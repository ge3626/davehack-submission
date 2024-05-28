import { IFollower } from '@/lib/types';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import axios from 'axios';
import { useUserContext } from '@/context/AuthContext';

interface Props {
    followers: IFollower[];
    setIsFollowersDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowersDialog = ({ followers, setIsFollowersDialogOpen } : Props) => {
    const { user } = useUserContext();
    
    const handleUnfollow = async (followed_user_id : string) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/follows/unfollow`, {
            params: {
                following_user_id: followed_user_id,
                followed_user_id: user.id
            }
        });
        setIsFollowersDialogOpen(false); //TODO
   }

   const handleFollow = async (following_user_id : string) => {
        const form = {
            following_user_id: following_user_id,
            followed_user_id: user.id
        }
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/follows/follow`, form);
        setIsFollowersDialogOpen(false); //TODO
    }
   
    return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
        </DialogHeader>
        <div>
            {followers && (
                followers.map((user, index) => (
                    <div key={index} className='flex justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='w-[42px] h-[42px]'>
                                <AvatarImage src={user.profile_img || "https://github.com/shadcn.png"} />
                            </Avatar>
                            <span>{user.username}</span>
                        </div>
                        {user.isfollowing ? (
                            <Button onClick={() => handleUnfollow(user.userid)}>Unfollow</Button>
                        ) : (
                            <Button onClick={() => handleFollow(user.userid)}>Follow</Button>
                        )}
                    </div>
                ))
            )}
        </div>
    </DialogContent>
  )
}

export default FollowersDialog