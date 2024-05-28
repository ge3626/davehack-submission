
import { useState } from 'react';
import { Button } from '../ui/button'

interface Props {
    question: string;
    answer: number;
}

const QuizCard = ({ question, answer } : Props) => {
    const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className='bg-white p-4 rounded-xl font-semibold text-[18px] flex flex-col gap-4'>
        <p>{question}</p>
        <div className='flex gap-4 items-center'>
            <Button onClick={() => setShowAnswer(!showAnswer)}>Show Answer</Button>
            {showAnswer && (
                <span>{answer}</span>
            )}
        </div>
  </div>
  )
}

export default QuizCard