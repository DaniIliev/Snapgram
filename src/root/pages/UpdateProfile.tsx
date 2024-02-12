import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/authContext'
import { useGetCurrentUser } from '@/lib/react-query/queryAndMutations'
import { updateProfileValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const UpdateProfile = () => {
  const {toast} = useToast()
  const navigate = useNavigate()

  const {data: currentUser, isPending} = useGetCurrentUser()


  // 1. Define your form.
  const form = useForm<z.infer<typeof updateProfileValidation>>({
    resolver: zodResolver(updateProfileValidation),
    defaultValues: {
      name: currentUser?.name,
      username: currentUser?.username,
      email: currentUser?.email,
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof updateProfileValidation>) {
  


  }
  return (
    <>
    <div className='py-20'>
    <Form {...form}>
        <div className="flex flex-col flex-center items-center sm:w-420">
          <img src="/logo.svg" alt="logo" />
          <h2 className="text-white h3-bold md:h2-bold pt-5 sm:pt-10">Upgrade your personal Information</h2>
          <p className="text-slate-300 small-medium md:base-regular mt-2">To use use Snapgram, please enter your account details</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="white">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" {...field}/>
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
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" {...field}/>
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
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" {...field}/>
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
                    <Input type="text" className=" bg-slate-600 text-white border-slate-50" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit" onSubmit={form.handleSubmit(onSubmit)} className="hover:bg-indigo-300 bg-violet-500">
                Edit User Profile
            </Button>
            <Button>
                <Link to={`/profile/${currentUser?.$id}`}>
                  Back
                </Link>
            </Button>
          </form>
        </div>
      </Form>
    </div>
    </>
  )
}

export default UpdateProfile