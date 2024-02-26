'use client';
import React from 'react'
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';

interface IssueForm{
  title: string,
  description: string
}

const newIssuePage = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const router = useRouter();

  const handleSubmitFunction: SubmitHandler<IssueForm> = async (formData) => {
    await fetch("../api/issues", {
      method: "POST",
      body: JSON.stringify(formData)
    });
    router.push('./');
  }
  
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(handleSubmitFunction)}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')}/>
      </TextField.Root>
      <Controller
        name='description'
        control= {control}
        render={({field}) => <SimpleMDE placeholder='Description' {...field}></SimpleMDE>}
      ></Controller>
      <Button className='hover:cursor-pointer'>Submit Issue</Button>
    </form>
  )
}

export default newIssuePage