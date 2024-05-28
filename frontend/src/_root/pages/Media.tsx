import { LeftSidebar, RightSidebar } from '@/components'
import ThreadCard from '@/components/MediaPage/ThreadCard'
import { useUserContext } from '@/context/AuthContext';
import { IThread } from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Media = () => {
  const [threads, setThreads] = useState<IThread[]>([]);
  const { setIsLoading } = useUserContext();

  useEffect(() => {
    const fetchThreads = async () => {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/thread/format`);
      setThreads(response.data);
      setIsLoading(false);
    }
    fetchThreads();
  }, []);

  return (
    <div className='w-screen h-screen'>
        <main className='flex flex-row'>
            <LeftSidebar />
            <section className='flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-8 max-md:pb-32 sm:px-10'>
                <div className='bg-purple-300 p-4 rounded-xl hover:bg-gray-300 active:bg-gray-400 mb-8'>
                  <Link to='/new-thread'>
                  Ask Questions to People!
                  </Link>
                </div>

                <div className='w-full max-w-4xl flex flex-col gap-6'>
                    {threads ? (
                      threads.map((thread) => (
                          <ThreadCard 
                            key={thread.id}
                            id={thread.id}
                            username={thread.username}
                            profile_img={thread.profile_img}
                            content={thread.content}
                            quiz={thread.quiz}
                            created_at={thread.created_at}
                            modified_at={thread.modified_at}
                          />
                      ))
                    ) : (
                      <span>No threads</span>
                    )}
                </div>
            </section>
            <RightSidebar />
        </main>
    </div>
  )
}

export default Media