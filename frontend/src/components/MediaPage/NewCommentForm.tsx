"use client"
import { SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { CommentValidation } from "@/lib/validation"
import { useCreateComment } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"

interface Props {
    thread_id: number;
    setIsReplying: React.Dispatch<SetStateAction<boolean>>;
    comment_replied_to_id: number | null;
}

const NewCommentForm = ({ thread_id, setIsReplying, comment_replied_to_id } : Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const { mutateAsync: createComment } = useCreateComment();
    const { user } = useUserContext();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          content: "",
          thread_id: thread_id,
          user_id: user.id,
          comment_replied_to_id: comment_replied_to_id
        },
    });

    function onSubmit(values: z.infer<typeof CommentValidation>) {
       try {
           createComment(values);
            form.reset();
            setIsReplying(false);
            toast({ title: "Comment is created." });
       } catch (error) {
         toast({ title: "Failed to create new comment." });
       }
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
            <FormItem>
                <div 
                    className={`bg-background flex flex-col gap-2 rounded-xl p-2 ${
                    isFocused ? 'ring-2 ring-violet-500' : ''
                    }`}
                >
                    <FormControl>
                        <textarea
                             className="bg-background text-[15px] px-2 pt-2 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </FormControl>
                    <div className="flex gap-2 justify-end">
                        <Button onClick={() => setIsReplying(false)}>Cancel</Button>
                        <Button type="submit">Comment</Button>
                    </div>
                </div>
                <FormMessage />
            </FormItem>
            )}
        />
    </form>
  </Form>
  )
}

export default NewCommentForm