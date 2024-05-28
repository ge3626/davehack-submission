import { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import axios from 'axios';
import { IComment } from '@/lib/types';
import NewCommentForm from './NewCommentForm';
import { Input } from '../ui/input';

const CommentSection = ({ thread_id } : {thread_id : number}) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comment/thread/format/${thread_id}`);
            setComments(response.data);
        }
        fetchComments();
    }, [thread_id]);

  return (
    <div className='w-full bg-gray-300 p-4 flex flex-col gap-6'>
        {isAdding ? (
            <NewCommentForm 
                thread_id={thread_id}
                setIsReplying={setIsAdding}
                comment_replied_to_id={null}
            />
        ) : (
            <Input 
                className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Add a comment" 
                onClick={() => setIsAdding(true)}
            />
        )}
        
        {comments ? (
            <div className='flex flex-col gap-4'>
            {comments.map((comment) => (
              (!comment.comment_replied_to_id) && (
                <CommentCard 
                    key={comment.id}
                    thread_id={thread_id}
                    comment={comment}
                />
              )
            ))}
            </div>
        ) : (
            <span>No comments</span>
        )}
    </div>
  )
}

export default CommentSection