import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignInValidation } from "@/lib/validation"
import { z } from 'zod'
import { Oval } from "react-loader-spinner"
import { Link } from "react-router-dom"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useToast } from "@/components/ui/use-toast"

const SignInForm = () => {
  const isLoading = false; //TODO
  const { toast } = useToast();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function onSubmit(values: z.infer<typeof SignInValidation>) {
    try {
      signInAccount(values);
      form.reset();
      toast({ title: "Logged into account."});
    } catch (error) {
      toast({ title: "Failed to log in."});
    }
  }

  return (
    <Form {...form}>
      <div className=" sm:w-[420px] flex-col items-center">
        <h2 className="font-bold md:font-bold pt-5 sm:pt-12">
          Log in to Your Account
        </h2>

        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Type your password" {...field} />
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
            ) : "Sign In"}
          </Button>
          
          <div className="flex gap-4 justify-centers">
            <p className="font-light">
              Forgot Password?
              <Link
                to="/help"
                className="font-semibold ml-2 hover:text-purple-500">
                Help
              </Link>
            </p>

            <p>Or</p>

            <p className="font-light">
              Create New Account:
              <Link
                to="/sign-up"
                className="font-semibold ml-2 hover:text-purple-500">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default SignInForm