import QuizCardWithInput from '@/components/Quiz/QuizCardWithInput';
import { useUserContext } from '@/context/AuthContext';
import { IMyQuiz } from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react'

const MyQuizzes = () => {
  const { user } = useUserContext();
  const [allQuizzes, setAllQuizzes] = useState<IMyQuiz[]>([]);
  const [wrongQuizzes, setWrongQuizzes] = useState<IMyQuiz[]>([]);

  useEffect(() => {
    const fetcData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quizs/user/${user.id}`);
      if (response.data) {
        setAllQuizzes(response.data);
      }
    }
    fetcData();
  }, [user.id]);

  useEffect(() => {
    const fetcData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quizs/wrong/${user.id}`);
      if (response.data) {
        setWrongQuizzes(response.data);
      }
    }
    fetcData();
  }, [user.id]);

  return (
    <div className='w-screen h-screen'>
      <div className='w-3/4 flex flex-col gap-6 mx-auto'> 
        <div className='bg-blue-300 p-4 flex flex-col gap-4'>
          <span className='font-bold'>Review Questions You Got Wrong</span>
          {wrongQuizzes && (
            wrongQuizzes.map((quiz) => (
              <QuizCardWithInput
                key={quiz.id}
                question={quiz.question}
                answer={quiz.answer}
              />
            ))
          )}
        </div>
        <div className='bg-pink-300 p-4 flex flex-col gap-4'>
          <span className='font-bold'>Review All Quizzes</span>
          {allQuizzes ? (
            allQuizzes.map((quiz) => (
              <QuizCardWithInput
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
    </div>
  )
}

export default MyQuizzes