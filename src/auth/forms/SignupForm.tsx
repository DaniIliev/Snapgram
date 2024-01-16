import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormMessage, Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { singUpValidationSchema } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "@/components/shared/loader"
import { Link } from "react-router-dom"




const SignupForm = () => {
  let isLoading = true;

  // 1. Define your form.
  const form = useForm<z.infer<typeof singUpValidationSchema>>({
    resolver: zodResolver(singUpValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof singUpValidationSchema>) {
    // const newUser = await createUserAccount(values)
    console.log(values)
  }
  return (
    <>
      <Form {...form}>
        <div className="flex flex-col flex-center items-center sm:w-420">
          <img src="/logo.svg" alt="logo" />
          <h2 className="text-white h3-bold md:h2-bold pt-5 sm:pt-10">Create a new account</h2>
          <p className="text-slate-300 small-medium md:base-regular mt-2">To use use Snapgram, please enter your account details</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="white">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="white">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" />
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
                  <FormLabel className="white">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" />
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
                  <FormLabel className="white">Password</FormLabel>
                  <FormControl>
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit" disabled={isLoading} className="hover:bg-indigo-300 bg-violet-500">
              {
                isLoading ?(
                  <div className="flex flex-center items-center gap-2">
                    <Loader />
                  </div>
                ):(
                  'Sign up'
                )      
              }
            </Button>

            <p className="text-small-regular text-slate-200 text-center ">Already have an account?
            <Link to='/sign-in' className="text-violet-500 text-bold ml-2">Log in</Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  )
}

export default SignupForm