import { IComment } from '@/lib/types'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GoComment } from 'react-icons/go'
import NewCommentForm from './NewCommentForm'
import axios from 'axios'
import { useUserContext } from '@/context/AuthContext'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { FiTrash } from 'react-icons/fi'
import { Dialog } from '../ui/dialog'
import DeleteDialog from '../shared/DeleteDialog'
import CommentEditDialog from './CommentEditDialog'
import { Avatar, AvatarImage } from '../ui/avatar'

interface Props {
    thread_id: number;
    comment: IComment;
}

const CommentCard = ({ thread_id, comment } : Props) => {
    const { profile_img, username, created_at, content, id, modified_at } = comment;
    const [isReplying, setIsReplying] = useState(false);
    const [replies, setReplies] = useState<IComment[]>([]);
    const { user } = useUserContext();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        const fetchReplies = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comment/reply/${id}`);
            if(response.data) {
                setReplies(response.data);
            }
        }
        fetchReplies();
    }, []);

  return (
    <div className='flex gap-4 w-full p-2 bg-purple-200'>
        <div className="flex flex-col gap-2 items-center">
            <Avatar>
                <AvatarImage src={profile_img ? profile_img : import.meta.env.VITE_DEFAULT_PIMG}/>
            </Avatar>
            <span className="border-l-2 border-black h-full"></span>
        </div>

        <div className="flex flex-col flex-1">
            <span className="font-semibold">{username}</span>
            {modified_at ? (
                <span className="text-gray-500 text-sm">modified at {modified_at}</span>
            ) : (
                <span className="text-gray-500 text-sm">created at {created_at}</span>
            )}
            
            <p className='mt-2'>{content}</p>

            <div className='flex items-center pt-2 cursor-pointer select-none'>
                <button
                    className='flex items-center gap-1 rounded-2xl p-1 px-4 hover:bg-gray-300 active:bg-gray-400 active:ring-2 active:ring-gray-300'
                    onClick={() => setIsReplying(true)}
                >
                    <GoComment className='w-[20px] h-[20px]'/>
                    <span className='text-sm'>Reply</span>
                </button>

                {user.username === username && (
                    <div className='rounded-2xl px-2 hover:bg-gray-300 active:bg-gray-400 active:ring-2 active:ring-gray-300'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button>
                                    <MoreHorizontal />
                                </button>
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
                    </div>
                )}
            </div>
            
            {isReplying && (
                <div className='mt-2'>
                    <NewCommentForm 
                        thread_id={thread_id}
                        setIsReplying={setIsReplying}
                        comment_replied_to_id={id}
                    />
                </div>
            )}

            {replies && (
                <div className='mt-2'>
                    {replies.map((reply) => (
                        <CommentCard 
                            key={reply.id}
                            thread_id={thread_id}
                            comment={reply}
                        />
                    ))}
                </div>
            )}
        </div>

        {username === user.username && (
                <Dialog
                    open={isEditDialogOpen || isDeleteDialogOpen}
                    onOpenChange={isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen}
                >
                    {isEditDialogOpen ? (
                        <CommentEditDialog 
                            setIsEditDialogOpen={setIsEditDialogOpen}
                            content={content}
                            id={id}
                        />
                    ) : (
                    <DeleteDialog
                        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                        apiRoute={`/comment/${id}`}
                        deleteType="comment"
                    />
                    )}
                </Dialog>
            )}
    </div>
  )
}

export default CommentCard