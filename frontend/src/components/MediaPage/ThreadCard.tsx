import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiHeart, FiMoreVertical, FiTrash } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { GoComment } from "react-icons/go";
import { CiShare1 } from "react-icons/ci";
import { IThread } from "@/lib/types";
import { useUserContext } from "@/context/AuthContext";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import ThreadEditDialog from "./ThreadEditDialog";
import DeleteDialog from "../shared/DeleteDialog";
import axios from "axios";
import CommentSection from "./CommentSection";
import { Avatar, AvatarImage } from "../ui/avatar";
import QuizCard from "../Quiz/QuizCard";

const ThreadCard = ({ username, profile_img, created_at, content, quiz, id, modified_at }: IThread) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { user } = useUserContext();
  const [doesUserLike, setDoesUserLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  
  useEffect(() => {
    const checkUserLiked = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/like/check`,
        {
          params: {
            'user_id': user.id,
            'thread_id': id
          }
      });
      if(response.data.liked) {
        setDoesUserLike(response.data.liked);
      }
    }
    checkUserLiked();
  }, [user.id]);

  useEffect(() => {
    const countLikes = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/like/count/${id}`);
      if(response.data) {
        setLikesCount(response.data.count);
      }
    }
    countLikes();
  }, [doesUserLike]);

  const handleLike = async () => {
    const form = {
      'user_id': user.id,
      'thread_id': id
    }
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/like`, form);
    if(response.data.isSuccess) {
      setDoesUserLike(true);
    }
  }

  const handleDislike = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/like/unlike`, 
      {
        params: {
          'user_id': user.id,
          'thread_id': id
        }
      });
      if(response.data.isDeleted) {
        setDoesUserLike(false);
      } 
  }

  return (
    <div className="flex flex-col gap-2 max-w-[750px]  border-2 border-gray-1200 rounded-xl">
      <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col gap-2 items-center">
          <Avatar>
            <AvatarImage src={profile_img ? profile_img : import.meta.env.VITE_DEFAULT_PIMG}/>
          </Avatar>
          <span className="border-l-2 border-slate-300 h-full"></span>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{username}</span>
            {username === user.username && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FiMoreVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-red-500 flex gap-2 items-center"
                  >
                    <FiTrash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {modified_at ? (
                <span className="text-gray-500 text-sm">modified at {modified_at}</span>
            ) : (
                <span className="text-gray-500 text-sm">created at {created_at}</span>
            )}
          <p className="mt-2">{content}</p>

          {quiz && (
              <QuizCard 
                question={quiz.question}
                answer={quiz.answer}
              />
       
          )}

          <div className="flex gap-4 mt-4 ">
            {doesUserLike ? (
                <FcLike 
                  className="w-[24px] h-[24px] cursor-pointer" 
                  onClick={handleDislike}
                />
            ) : (
              <FiHeart 
                className="w-[24px] h-[24px] cursor-pointer" 
                onClick={handleLike}
              />
            )}
            <GoComment 
                className="w-[24px] h-[24px] cursor-pointer" 
                onClick={() => setIsCommentOpen(!isCommentOpen)}
            />
            <CiShare1 className="w-[24px] h-[24px] cursor-pointer" />
          </div>
          
          {likesCount > 0 && (
           <span className="font-semibold pt-2">{likesCount} users liked this thread.</span>
          )}
        </div>

        {username === user.username && (
          <Dialog
            open={isEditDialogOpen || isDeleteDialogOpen}
            onOpenChange={isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen}
          >
            {isEditDialogOpen ? (
              <ThreadEditDialog
                quiz={quiz}
                content={content}
                thread_id={id}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
            ) : (
              <DeleteDialog
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                apiRoute={`/thread/${id}`}
                deleteType="thread"
              />
            )}
          </Dialog>
        )}
      </div>
      {isCommentOpen && (
        <CommentSection thread_id={id}/>
      )}
    </div>
  );
};

export default ThreadCard;
