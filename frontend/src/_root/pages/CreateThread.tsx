import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import { useCreateThread } from '@/lib/react-query/queriesAndMutations'
import { IMyQuiz } from '@/lib/types'
import { NewThreadValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Oval } from 'react-loader-spinner'
import { z } from 'zod'

const CreateThread = () => {
    const { toast }= useToast();
    const { user, isLoading } = useUserContext();
    const { mutateAsync: createThread } = useCreateThread();
    const [quizzes, setQuizzes] = useState<IMyQuiz[]>([]);
    
    const form = useForm<z.infer<typeof NewThreadValidation>>({
      resolver: zodResolver(NewThreadValidation),
      defaultValues: {
        quiz_id: 0,
        content: ""
      },
    });
   
    function onSubmit(values: z.infer<typeof NewThreadValidation>) {
      try {
        createThread(values);
        form.reset();
        toast({ title: "New thread created." });
      } catch (error) {
        toast({ title: "Failed to create new thread." });
      }
    }

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quizs/user/${user.id}`);
            setQuizzes(response.data);
        }
        fetchQuizzes();
    }, [user.id]);
    
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <Form {...form}>
            <div className=" sm:w-[420px] md:w-1/2 lg:w-1/3 flex-col items-center bg-white p-8 rounded-xl">
                <h2 className="font-bold md:font-bold pt-5 sm:pt-12">
                Create a new Thread
                </h2>

                <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col gap-5 w-full mt-4"
                >
                <FormField 
                      control={form.control}
                      name="quiz_id"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quiz</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))} >
                                <FormControl>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Select a Quiz" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>quizzes</SelectLabel>
                                        {quizzes ? (
                                            quizzes.map((quiz) => (
                                                <SelectItem key={quiz.id} value={quiz.id.toString()}>                                  
                                                    {quiz.question}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectLabel>No quizzes</SelectLabel>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormItem>
                      )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Type your thread here" {...field} 
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit">
                    {isLoading ? (
                    <div className="flex gap-2 items-center">
                        <Oval width="28" height="28" strokeWidth="6" color="white"/> 
                        <p>Loading ...</p>
                    </div>
                    ) : "Create"}
                </Button>
                </form>
            </div>
        </Form>
    </div>
  )
}

export default CreateThread