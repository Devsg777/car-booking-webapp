import ReviewsForm from '@/app/ui/Reviews/ReviewsForm'
import { getReviewById } from '@/actions/getReviewById';
import { auth } from '@clerk/nextjs';
import React from 'react'

const page = async({ params }: { params: { reviewId: string } }) => {

  const {userId} = auth();
  if(!userId) return <div>Not authenticated...</div>
  const review = await getReviewById(params.reviewId);
  return (

    <div>
      
      <h2 className='text-2xl underline font-bold mb-10'>Reviews</h2>
    <ReviewsForm review={review}/>

    </div>
  )
}

export default page 