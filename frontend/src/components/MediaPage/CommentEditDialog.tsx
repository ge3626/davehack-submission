import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { SetStateAction, useState } from 'react'
import axios from 'axios'
import { useToast } from '../ui/use-toast'

interface Props {
    id: number;
    content: string;
    setIsEditDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

const CommentEditDialog = ({ id, content, setIsEditDialogOpen } : Props) => {
    const [contentValue, setContentValue] = useState(content);
    const { toast } = useToast();

    const handleSubmit = async () => {
        const form = {
            content: contentValue
        }
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/comment/${id}`, form);
        if(response.data.isUpdated) {
            toast({ title: "Updated comment." });
        } else {
            toast({ title: "Failed to update comment." });
        }
        setIsEditDialogOpen(false);
    }

  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
            <Textarea 
                value={contentValue}
                onChange={(e) => setContentValue(e.target.value)}
            />
        </div>

        <DialogFooter>
            <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
    </DialogContent>
  )
}

export default CommentEditDialog