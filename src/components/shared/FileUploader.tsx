import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string,
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState('')

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', 'jpeg', '.jpg', '.svg']
        }
    })
    return (
        <div {...getRootProps()} className='flex justify-center items-center flex-col  bg-slate-600 rounded-xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
            {
                fileUrl ? (
                    <>
                        <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                            <img
                                src={fileUrl}
                                alt='image'
                                className='h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top'
                            />
                        </div>
                        <p className='mb-5  text-slate-400'>Click or drag photo to replace</p>
                    </>
                ) :
                    (
                        <div className='flex justify-center items-center flex-col p-7 h-60 lg:h-[612px];'>
                            <img src="/icons/file-upload.svg"
                                alt="upload image"
                                width={96}
                                height={77} />
                            <h3 className='nase-medium text-slate-400'>Drag photo here...</h3>
                            <p className='small-regular mb-6 text-slate-400'>SVG, PNG, JPG</p>
                            <Button className='bg-slate-500 hover:bg-slate-400'>
                                Select from computer
                            </Button>
                        </div>
                    )
            }
        </div>
    )
}

export default FileUploader