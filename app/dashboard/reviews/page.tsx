import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import ReviewsForm from "@/app/ui/Reviews/ReviewsForm";
import { Rating } from "@mui/material";
import { Button } from "@/components/ui/button";
import ReviewDelete from "@/app/ui/Reviews/ReviewDelete";



async function page() {

  const getReviews = async () => {
    try {
      const reviews = await db.reviews.findMany({include: {user: true}});

      if (!reviews) return null;

      return reviews;
    } catch (err: any) {
      throw err;
    }
  };

  const reviews = await getReviews();



  return (
    <div>
       <h2 className='text-2xl underline font-bold mb-10 ml-3'>Reviews</h2>
      <div className="border-2 mx-10 rounded-2xl ">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Sl.No</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Place</TableHead>
              <TableHead className="">Message</TableHead>
              <TableHead className="">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {reviews?.map((reviews, i) => (
            
              <TableRow key={reviews.id}>
                <TableCell className="ml-3 text-center">
                  <Link
                    href={`/dashboard/reviews/${reviews.id}`}
                    className="font-bold"
                  >
                    {i + 1}
                  </Link>
                </TableCell>
                <TableCell className="text-center ">
                  <Link
                    href={`/dashboard/reviews/${reviews.id}`}
                    className=" flex gap-2 items-center "
                  >
                    <Image
                      width={100}
                      height={100}
                      src={reviews.user.profile_image_url}
                      alt="car Image"
                      className="object-cover rounded-full h-10 w-10"
                    /> <p> {reviews.user.first_name} {reviews.user.last_name}</p>
                  </Link>
                </TableCell>
                <TableCell className=""><Link
                    href={`/dashboard/reviews/${reviews.id}`}
                    className="font-bold"
                  >{reviews.place}</Link></TableCell>
                <TableCell className="">{reviews.description}</TableCell>
                <TableCell className=""><Rating name="read-only" value={reviews.rating} readOnly /></TableCell>
                <TableCell className=""><ReviewsForm review={reviews}/></TableCell>
                <TableCell className=""><ReviewDelete reviewId={reviews.id}/></TableCell>
              </TableRow>
      
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-10 mr-10">
        <ReviewsForm review={null}/>
      </div>
    </div>
  );
}

export default page;
