import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormMessage, Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { singinValidationSchema } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "@/components/shared/loader"
import { Link, useNavigate } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queryAndMutations"
import { useUserContext } from "@/context/authContext"




export const SigninForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const { mutateAsync: signInAccount, } = useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof singinValidationSchema>>({
    resolver: zodResolver(singinValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof singinValidationSchema>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({ title: "Sign in failed: Please try again." })
    }
    const isLoggedIn = await checkAuthUser()


    if (isLoggedIn) {
      form.reset() 

      navigate('/')
    } else {
      return toast({ title: "Sign in failed: Please try again." })
    }
  }
  return (
    <>
      <Form {...form}>
        <div className="flex flex-col flex-center items-center sm:w-420">
          <img src="/logo.svg" alt="logo" />
          <h2 className="text-white h3-bold md:h2-bold pt-5 sm:pt-10">Log in to your account</h2>
          <p className="text-slate-300 small-medium md:base-regular mt-2">Welcome back, please enter your account details</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="white">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" {...field} />
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
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit" onSubmit={form.handleSubmit(onSubmit)} className="hover:bg-indigo-300 bg-violet-500">
              {
                isUserLoading ? (
                  <div className="flex flex-center items-center gap-2">
                    <Loader />
                  </div>
                ) : (
                  'Sign up'
                )
              }
            </Button>

            <p className="text-small-regular text-slate-200 text-center ">Don't habe an account?
              <Link to='/sign-up' className="text-violet-500 text-bold ml-2">Sign in</Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  )
}

