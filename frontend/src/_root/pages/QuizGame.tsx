import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/AuthContext';
import { INewQuiz } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';

const QuizGame = () => {
    const [gameStart, setGameStart] = useState(false);
    const { user } = useUserContext();
    
    // Quiz state
    const [index, setIndex] = useState(0);
    const [pointIndex, setPointIndex] = useState(0);
    const [currentPoint, setCurrentPoint] = useState(0);
    const [addPoint, setAddPoint] = useState(1);
    const [currentQuiz, setCurrentQuiz] = useState<INewQuiz>();
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [answer, setAnswer] = useState<number | null>(null);
    
    // Function to generate random quiz
    function generateRandomQuiz() {
        const symbols = ['+', '-', '/', '*'];
        let firstNum = Math.floor(Math.random() * 101);
        let secondNum = Math.floor(Math.random() * 101);
        let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        let answer = 0;
        
        switch (randomSymbol) {
            case '+':
                    answer = firstNum + secondNum;
                break;
                case '-':
                    answer = firstNum - secondNum;
                break;
                case '*':
                    answer = firstNum * secondNum;
                break;
                case '/':
                    if(firstNum % secondNum != 0){
                        firstNum += secondNum - (firstNum % secondNum);
                    }
                    answer = firstNum / secondNum;
                     break;
                }
                    
        const question = `What is ${firstNum} ${randomSymbol} ${secondNum} = ?`;
        setAddPoint(addPoint + pointIndex);
    
        return { question, answer };
    }

    // Timer
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);

    const {
        seconds,
        pause,
        restart
    } = useTimer({ expiryTimestamp: time, onExpire: () => console.warn('onExpire called') });

    // Start or restart timer when the game starts
    useEffect(() => {
        if(gameStart) {
            restart(time);
        }
    }, [gameStart]);

    // Generate new quiz when the game starts or the index changes
    useEffect(() => {
        if (gameStart) {
            const randomQuiz = generateRandomQuiz();
            if (randomQuiz) {
                setCurrentQuiz({
                    question: randomQuiz.question,
                    answer: randomQuiz.answer,
                    points: addPoint
                });
            }
            console.log(randomQuiz)
        }
    }, [gameStart, index]);

    // Function to check the answer
    const checkAnswer = async (answer: number | null) => {
        if(currentQuiz) {
            if (answer === currentQuiz.answer) {
                setCurrentPoint(currentPoint + addPoint);
                setIsCorrect(true);
            } else {
                setAddPoint(1);
                setPointIndex(0);
                setIsCorrect(false);
            }

            // Send answer to backend
            const form = {
                question: currentQuiz.question,
                answer: currentQuiz.answer,
                points: currentPoint,
                first_got_correct: answer === currentQuiz.answer
            };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/quizs/${user.id}`, form);

            // Automatically show the next question after 2 seconds
            setTimeout(() => {
                setPointIndex(pointIndex => pointIndex + 1);
                setIndex(index => index + 1);
                setAnswer(null); 
                setIsCorrect(null);
            }, 2000); 
        }
    }
    
    useEffect(( )=> {
        if(seconds == 0) {
            setGameStart(false);
            pause();
        }
    } , [seconds]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setAnswer(parseFloat(value));
    }

    // Handle end of quiz
    const handleFinish = async () => {
        setGameStart(false);
        pause();
    }

    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col justify-center items-center gap-2 p-4'>
                {gameStart ? (
                    <Button onClick={handleFinish}>End Quiz</Button>
                ) : (
                    <Button onClick={() => setGameStart(true)}>Start Quiz</Button>
                )}

                {(gameStart && currentQuiz) && (
                    <div className="relative w-3/4 h-[900px] bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ee/f7/09/eef7095fc26e27190c4b691404d291c4.png)' }}>
                        <div className='absolute top-0 left-0 p-4 text-white text-bold text-[50px] flex justify-between items-center w-full'>
                            <span>{seconds}s</span>
                            <span className='text-[32px]'>Current Point: {currentPoint}</span>
                        </div>

                        <div className='absolute top-32 left-1/2 transform -translate-x-1/2 bg-white w-[600px] h-[300px] text-[42px] flex flex-col items-center justify-center'>
                            <span>Quiz {index + 1}.</span>
                            <p>{currentQuiz.question}</p>
                            {isCorrect !== null && (
                                <p>{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 p-4 flex items-center gap-20 w-full justify-center">
                            <Avatar className='w-[100px] h-[100px] mb-10'>
                                <AvatarImage src={user.profile_img ? user.profile_img : import.meta.env.VITE_DEFAULT_PIMG}/>
                            </Avatar>
                            <input id="answer" onChange={handleChange} className='text-[32px] p-2 border border-gray-300 rounded'/>
                            <button onClick={() => checkAnswer(answer)} className='bg-blue-500 text-white p-2 rounded'>Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuizGame;
