import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import React, { SetStateAction } from "react"
import axios from "axios";
import { useToast } from "../ui/use-toast";

interface Props {
  setIsDeleteDialogOpen: React.Dispatch<SetStateAction<boolean>>
  deleteType: string;
  apiRoute: string;
}

const DeleteDialog = ({ setIsDeleteDialogOpen, deleteType, apiRoute } : Props) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}${apiRoute}`);
    if(response.data.isDeleted) {
      toast({ title: `Deleted ${deleteType}.`});
    } else {
      toast({ title: `Failed to delete ${deleteType}.` });
    }
    setIsDeleteDialogOpen(false);
  }
  
  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription className="text-gray-600">
                This action cannot be undone. This will permanently delete your {deleteType} and remove your data from our servers.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete}>Continue</Button>
        </DialogFooter>
    </DialogContent>
  )
}

export default DeleteDialog