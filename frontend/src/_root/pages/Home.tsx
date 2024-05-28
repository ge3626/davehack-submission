import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/context/AuthContext";
import { IFollower, IFollowing, IMyQuiz } from "@/lib/types";
import { Dialog } from '../../components/ui/dialog';
import axios from "axios";
import { useEffect, useState } from "react";
import FollowersDialog from "@/components/HomePage/FollowersDialog";
import FollowingDialog from "@/components/HomePage/FollowingDialog";
import QuizCard from "@/components/Quiz/QuizCard";

const Home = () => {
 const [quizzes, setQuizzes] = useState<IMyQuiz[]>([]);
 const [followers, setFollowers] = useState<IFollower[]>([]);
 const [following, setFollowing] = useState<IFollowing[]>([]);
 const [isFollowersDialogOpen, setIsFollowersDialogOpen] = useState(false);
 const [isFollowingDialogOpen, setIsFollowingDialogOpen] = useState(false);
 const { user } = useUserContext();

 useEffect(() => {
  const fetchQuizzes = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quizs/user/${user.id}`)
    if(response.data) {
      setQuizzes(response.data);
    }
  }
  fetchQuizzes();
 }, [user.id]);

 useEffect(() => {
  const fetchFollowers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/follows/followers/format/${user.id}`);
    if(response.data) {
      setFollowers(response.data);
    }
  }
  fetchFollowers();
 }, [user.id]);

 useEffect(() => {
  const fetchFollowing = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/follows/following/format/${user.id}`);
    if(response.data) {
      setFollowing(response.data);
    }
  }
  fetchFollowing();
 }, [user.id]);
  
  return (
    <div className='w-screen h-screen  select-none flex flex-col'>
      <div className="w-3/4 xl:w-2/5 h-full mx-auto">
        <div className="bg-pink-200 flex items-center justify-around p-4 pt-20 pb-8">
          <Avatar className='w-[100px] h-[100px]'>
            <AvatarImage src={user.profile_img || import.meta.env.VITE_DEFAULT_PIMG} />
          </Avatar>

          <div className="flex flex-col gap-4">
            <span className="text-[32px]">{user.username}</span>
            <div className="flex gap-8 font-semibold cursor-pointer">
              <span>{quizzes.length} quizzess solved</span>
              <span>Total Points: </span>
              <span onClick={() => setIsFollowersDialogOpen(true)}>{followers.length} Followers</span>
              <span onClick={() => setIsFollowingDialogOpen(true)}>{following.length} Following</span>
            </div>
          </div>
        </div>
        
        <div className='bg-pink-300 p-4 flex flex-col gap-4'>
          <span className='font-bold'>All Questions You Took</span>
          {quizzes ? (
            quizzes.map((quiz) => (
              <QuizCard 
                key={quiz.id}
                question={quiz.question}
                answer={quiz.answer}
              />
            ))
          ) : (
            <span>Play quiz!</span>
          )}
        </div>
      
      </div>
      <Dialog
        open={isFollowersDialogOpen || isFollowingDialogOpen}
        onOpenChange={isFollowersDialogOpen ? setIsFollowersDialogOpen : setIsFollowingDialogOpen}
      >
        {isFollowersDialogOpen ? (
          <FollowersDialog followers={followers} setIsFollowersDialogOpen={setIsFollowersDialogOpen}/>
        ) : (
          <FollowingDialog following={following} setIsFollowingDialogOpen={setIsFollowingDialogOpen}/>
        )}
      </Dialog>
    </div>
  )
}

export default Home