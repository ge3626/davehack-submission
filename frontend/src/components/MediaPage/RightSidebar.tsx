import { useUserContext } from "@/context/AuthContext";
import { IUserWithFollows } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react"
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

const RightSidebar = () => {
  const [allUsers, setAllUsers] = useState<IUserWithFollows[]>([]);
  const { user } = useUserContext();
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/with-follows`, {
        params: {
          id: user.id
        }
      });
      if(response.data) {
        setAllUsers(response.data);
      }
    }
    fetchUsers();
    
  }, []);

  const handleUnfollow = async (userId : string) => {
     await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/follows/unfollow`, {
      params: {
          following_user_id: userId,
          followed_user_id: user.id
      }
    });
  }

  const handleFollow = async (userId: string) => {
    const form = {
      following_user_id: userId,
      followed_user_id: user.id
    }
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/follows/follow`, form);
  }

  return (
    <section className="bg-green-200 sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-black px-10 pb-6 pt-28 max-xl:hidden">
        <span className="font-semibold text-[22px]">Friends</span>
        <div className="h-full">
          {allUsers ? (
            allUsers.map((user) => (
              <span
                key={user.id}
                className="flex gap-6 items-center font-semibold"
              >
                <Avatar>
                  <AvatarImage src={user.profile_img ? user.profile_img : import.meta.env.VITE_DEFAULT_PIMG}/>
                </Avatar>
                {user.username}
                {user.isfollowing ? (
                  <Button onClick={() => handleUnfollow(user.id)}>Unfollow</Button>
                ) : (
                  <Button onClick={() => handleFollow(user.id)}>Follow</Button>
                )}
              </span>
            ))
          ) : (
            <span>No user</span>
          )}

        </div>
    
    </section>
  )
}

export default RightSidebar