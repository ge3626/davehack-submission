import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import axios from "axios";
import { useToast } from "../ui/use-toast";

interface Props {
    route_id: number;
    title: string;
    setIsEditDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

const RouteEditDialog = ({ route_id, title, setIsEditDialogOpen } : Props) => {
    const [titleValue, setTitleValue] = useState(title);
    const { toast } = useToast();

    const handleSubmit = async () => {
        const form = {
            title: titleValue
        }
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/route/${route_id}`, form);
        if (response.data.isUpdated) {
            toast({ title: "Route is updated." });
        } else {
            toast({ title: "Failed to update route." });
        }
        setIsEditDialogOpen(false);
    }

  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Edit Thread</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Name
            </Label>
            <Input
              id="title"
              value={titleValue}
              className="col-span-3"
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
            <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
    </DialogContent>
  )
}

export default RouteEditDialog