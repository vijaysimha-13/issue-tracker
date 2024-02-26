'use client';
import React, { useState } from 'react'
import { TextField, Button, Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Loader from '@/app/components/Loader';

type issueSchema = z.infer<typeof createIssueSchema>;

const newIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<issueSchema>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const handleSubmitFunction: SubmitHandler<issueSchema> = async (formData) => {
    try {
      setSubmitting(true);
      const response = await fetch("../api/issues", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      setSubmitting(false);
      router.push('./');
    } catch (error) {
      setSubmitting(false);
    }
  }

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(handleSubmitFunction)}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name='description'
        control={control}
        render={({ field }) => <SimpleMDE placeholder='Description' {...field}></SimpleMDE>}
      ></Controller>
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button className='hover:cursor-pointer' disabled={isSubmitting} >
        {isSubmitting && <Loader></Loader>}
        Submit Issue</Button>
    </form>
  )
}

export default newIssuePage