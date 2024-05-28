import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SetStateAction, useEffect, useState } from "react"
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IQuiz  } from "@/lib/types";
import axios from "axios";
import { useUserContext } from "@/context/AuthContext";
import { SelectItem } from "../ui/select";
import { useToast } from "../ui/use-toast";

interface Props {
    quiz: IQuiz | null;
    content: string;
    thread_id: number;
    setIsEditDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  }

const ThreadEditDialog = ({ quiz, content, thread_id, setIsEditDialogOpen } : Props) => {
    const [quizIdValue, setQuizValue] = useState(quiz?.id);
    const [contentValue, setContentValue] = useState(content);
    const [quizs, setQuizs] = useState<IQuiz[]>([]);
    const { user } = useUserContext();
    const { toast } = useToast();

    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quiz/user/${user.id}`);
            setQuizs(response.data);
        }
        fetchQuiz();
    }, [user.id]);

    const handleSubmit = async () => {
        const form = {
            quiz_id: quizIdValue,
            content: contentValue,
        }
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/thread/${thread_id}`, form);
        if(response.data.isUpdated) {
            toast({ title: "Thread is updated." });
            //location.reload(); TODO
        } else {
            toast({ title: "Failed to update thread." });
        }
        setIsEditDialogOpen(false);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Thread</DialogTitle>
            </DialogHeader>
            
            <Select onValueChange={(value) =>setQuizValue(Number(value))}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={quiz ? quiz.question : "Select a quiz"}/>
                </SelectTrigger>
                 <SelectContent>
                    <SelectGroup>
                        <SelectLabel>quizs</SelectLabel>
                        {quizs ? (
                            quizs.map((quiz) => (
                                <SelectItem key={quiz.id} value={quiz.id.toString()}>                                
                                    {quiz.question}
                                </SelectItem>
                                ))
                            ) : (
                                <SelectLabel>No quizs</SelectLabel>
                            )}
                    </SelectGroup>
                </SelectContent>
            </Select>
     
            <div className="flex flex-col gap-4">
                <Label>Content</Label>
                <Textarea 
                    id="content" 
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                />
            </div>
            
            <DialogFooter>
                <Button onClick={handleSubmit}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
  );
}

export default ThreadEditDialog