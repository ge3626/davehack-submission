import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUserContext } from "@/context/AuthContext"
import axios from "axios"
import { useState } from 'react'
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

export const SettingSidebar = () => {
    const { user } = useUserContext();
    const [form, setForm] = useState({username: user.username, profile_img: user.profile_img})
    const { toast } = useToast();
    const navigate = useNavigate();

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm((preValue) => ({
        ...preValue,
        [id]: value
    }))
  }

  const handleSubmit = async () => {
      axios.defaults.withCredentials = true;
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`, form)
      .then((res) => {
        if(res.data.isUpdated) {
          toast({ title: "User info is updated." });
        } else {
          toast({ title: "Failed to update user info."});
        }
      })
      .catch((err) => alert(err));
  }

  const handleDelete = async () => {
    axios.defaults.withCredentials = true;
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`)
    .then((res) => {
      if(res.data.isDeleted) {
        toast({ title: "User is deleted." });
        navigate('/sign-in');
      } else {
        toast({ title: "Failed to delete user." });
      }
    })
    .catch((err) => alert(err));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Setting</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value={form.username} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Profile
            </Label>
            <Input id="profile_url" defaultValue="url" value={form.profile_img} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleSubmit}>Save changes</Button>
          </SheetClose>
        </SheetFooter>

        <SheetFooter className="absolute bottom-0 right-0 p-6">
          <SheetClose asChild>
              <Button
                className="bg-white border-2 border-red-500 text-red-500 hover:bg-gray-100"
                onClick={handleDelete}
              >
                Delete Account
              </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SettingSidebar;