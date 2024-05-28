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
import { SignUpValidation } from "@/lib/validation"
import { z } from 'zod'
import { Oval } from 'react-loader-spinner'
import { Link } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignUpForm = () => {
  const { toast }= useToast();
  const { isLoading } = useUserContext();
  const { mutateAsync: createAccount} = useCreateAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  });
 
  function onSubmit(values: z.infer<typeof SignUpValidation>) {
    try {
      createAccount(values);
      form.reset();
      toast({ title: "Created new account." });
    } catch (error) {
      toast({ title: "Failed to create new account." });
    }
  }

  return (
    <Form {...form}>
      <div className=" sm:w-[420px] flex-col items-center">
        <h2 className="font-bold md:font-bold pt-5 sm:pt-12">
          Create a new account
        </h2>

        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Type your name" {...field} 
                    onChange={(e) => {
                      field.onChange(e.target.value.toLowerCase());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="Type your name" {...field} />
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

          <p className="text-center font-light">
            Already have an account?
            <Link
              to="/sign-in"
              className="font-semibold ml-2 hover:text-purple-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm