"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Reviews } from "@prisma/client";

interface ReviewsFromProps{
  review:Reviews|null
}



const ReviewsForm = ({review}:ReviewsFromProps) => {


  const [description, setDescription] = useState<string>(review?.description || "");
  const [rating, setRating] = React.useState<number | null>(review?.rating || null);
  const [place, setPlace] = useState<string>(review?.place || "");
  const [messageCount, setMessageCount] = useState<number>(0);
  const [messageError, setMessageError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || !rating || !place) {
      setMessageError("Please fill all the fields");
      return;
    }
    if (description.length < 10) {
      setMessageError("Minimum 10 characters required");

      return;
    } else if (description.length > 200) {
      setMessageError("Maximum 200 characters allowed");
      return;
    }

    // You can perform form validation here before submitting
    console.log("Submitted:", { description, rating, place });
    try {
      if(review){
        axios.patch(`/api/reviews/${review.id}`, { description, rating, place }).then((res) => {
          toast({
            variant: "success",
            description: "🎉 Review Updated successfully ",
          })
          router.push(`/dashboard/reviews`);
        }).catch((err) => {
          console.log(err);
          toast({
            variant: "danger",
            description: "Something went Wrong",
          })
        })
        

      }else{
        axios
        .post("/api/reviews", { description, rating, place })
        .then((res) => {
          toast({
            variant: "success",
            description: "🎉 Review Added successfully ",
          });
          
          
          router.refresh()
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "danger",
            description: "Something went Wrong",
          });
        });
      
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }

    setDescription("");
    setMessageCount(0);
    setRating(5);
    setPlace("");
    setMessageError(null);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-emerald-400 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">

          {review ? "Edit" : "Add a Review"}
        </DialogTrigger>
        <DialogContent className="bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 backdrop:blur-xl">
          <DialogHeader>
            <DialogTitle> Review your Experience</DialogTitle>
            <div className="container mx-auto max-w-md py-8 bg-transparent">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Are You From
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Write a Message
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setMessageCount(e.target.value.length);
                    }}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  <div>
                    {messageError && (
                      <p className="text-red-500 text-xs italic">
                        {messageError}
                      </p>
                    )}
                    <p
                      className={`text-sm ${messageCount < 200 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {messageCount} / 200 characters
                    </p>
                  </div>
                </div>
                <div className="mb-4 m-auto">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Give a rating
                  </label>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </div>
                <div>
                  {" "}
                  <Button
                    type="submit"
                    className="bg-emerald-400 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsForm;
