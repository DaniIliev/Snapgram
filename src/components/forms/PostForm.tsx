import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
const PostForm = ({post}) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                                    className='bg-slate-600 text-white rounded-xl border-none' />
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
                    >Cansel</Button>
                    <Button 
                    type="submit"
                    className='bg-violet-300 hover:bg-violet-400'>Submit</Button>
                </div>

            </form>
        </Form>
    )
}

export default PostForm