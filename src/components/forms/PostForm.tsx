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
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queryAndMutations'
import { Loader } from '../shared/loader'
import { updatePost } from '@/lib/appwrite/api'

type PostFormProps = {
    post?: Models.Document,
    action: 'Create' | 'Update',
}

const PostForm = ({ post, action }: PostFormProps) => {

    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

    const { user } = useUserContext()
    const navigate = useNavigate()
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

        if(post && action === 'Update'){
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl
            })


            if(!updatedPost){
                toast({title: 'Please try again'})
            }
            return navigate(`/posts/${post.$id}`)
        }

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
                                    className='bg-slate-600 text-zinc-300  h-36 rounded-xl border-none'
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
                                    className='bg-slate-600  text-zinc-300  rounded-xl border-none' {...field} />
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
                        className='bg-violet-300 hover:bg-violet-400 '>
                        {isLoadingCreate && <Loader/>}
                        {action === 'Create' ? 'Submit' : 'Update Post'}
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default PostForm