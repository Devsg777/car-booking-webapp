'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const ReviewDelete = ({reviewId}:any) => {
const router = useRouter();
function handleDelete(){

  try {
    axios.delete(`/api/reviews/${reviewId}`)
    toast({
      variant: "success",
      description: "🎉 Review Deleted successfully ",
    })
    router.push(`/dashboard/reviews`)
    router.refresh();
  } catch (err) {
    console.log(err);
    toast({
      variant: "destructive",
      description: "Something went wrong",
    });
  }
}

  return (
    <div>
        <Dialog >
  <DialogTrigger className='bg-red-500 text-white p-2 rounded-md'>Remove</DialogTrigger>
  <DialogContent className='w-96'>
    <DialogHeader>
      <DialogTitle>Confirm to Delete</DialogTitle>
      <DialogDescription>
        Are you sure you want to remove this review?
      </DialogDescription>
    </DialogHeader>
    <div className='flex justify-end'>
    <Button className='bg-red-500 text-white p-2 rounded-xl w-fit ' onClick={handleDelete}>Delete</Button>
    </div>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default ReviewDelete