import { useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Props {
    question: string;
    answer: number;
}

const QuizCardWithInput = ({ question, answer } : Props) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [haveTried, setHaveTried] = useState(false);
    const [input, setInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const checkAnswer = () => {
        if (answer === parseFloat(input)) {
            setIsCorrect(true);
        }
        setHaveTried(true)
    }
    
  return (
    <div className='bg-white p-4 rounded-xl font-semibold text-[18px] flex flex-col gap-4'>
        <p>{question}</p>
        <div className='flex items-center gap-4 w-3/4'>
            <Input placeholder='solve again' value={input} onChange={(e) => setInput(e.target.value)}/>
            <Button onClick={checkAnswer}>Check Answer</Button>

            {haveTried && (
                isCorrect ? (
                    <span>Correct!</span>
                ) : (
                    <span>Wrong</span>
                )
            )}
        </div>
        {haveTried && (
            <div className='flex gap-4 items-center'>
                {showAnswer ? (
                    <Button onClick={() => setShowAnswer(false)}>Hide Answer</Button>
                ) : (
                    <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>
                )}
                {showAnswer && (
                    <span className='text-gray-400'>{answer}</span>
                )}
            </div>
        )}
  </div>
  )
}

export default QuizCardWithInput