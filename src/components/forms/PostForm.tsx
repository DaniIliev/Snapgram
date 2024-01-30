import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'
import { postValidationSchema } from '@/lib/validation'
import { Models } from 'appwrite'
import { useUserContext } from '@/context/authContext'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { useCreatePost } from '@/lib/react-query/queryAndMutations'
import { Loader } from '../shared/loader'

type PostFormProps = {
    post?: Models.Document,
    action: 'Create' | 'Update',
}

const PostForm = ({ post, action }: PostFormProps) => {

    const { mutateAsync: createPost, isPending: isLoadingCreate } =
        useCreatePost();
    const { user } = useUserContext()
    const navigate = useNavigate()
    console.log(user)
    // 1. Define your form.
    const form = useForm<z.infer<typeof postValidationSchema>>({
        resolver: zodResolver(postValidationSchema),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post.tags.join(',') : ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof postValidationSchema>) {
        const newPost = await createPost({
            ...values,
            userId: user.id
        })

        if (!newPost) {
            toast({
                title: 'Please try again'
            })
        } else {
            navigate('/')
        }
        console.log(post?.imageUrl)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-2-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="shadcn"
                                    className='bg-slate-600 placeholder:text-zinc-300 h-36 rounded-xl border-none'
                                    {...field} />
                            </FormControl>
                            <FormMessage className='text-red' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className='text-red' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Add Location</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='bg-slate-600 text-white rounded-xl border-none' {...field} />
                            </FormControl>
                            <FormMessage className='text-red' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Add Tags
                                (seperated by comma ", ")</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='bg-slate-600 placeholder:text-zinc-300 rounded-xl border-none'
                                    placeholder="Art, Expression, Learn"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red' />
                        </FormItem>
                    )}
                />
                <div className='flex justify-center gap-10'>
                    <Button
                        type="button"
                        className='text-white bg-slate-600 hover:bg-slate-700'
                    >Cansel
                    </Button>

                    <Button
                        type="submit"
                        className='bg-violet-300 hover:bg-violet-400'>
                        {isLoadingCreate && <Loader/>}
                        Submit
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default PostForm