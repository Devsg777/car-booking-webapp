import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Rating } from "@mui/material";
import db from "@/lib/db";



const TestimonialSection = async () => {
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
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="font-bold text-gray-800 dark:text-white text-3xl">
                        Client’s Say About Us
                    </h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, repellendus.</p>
                </div>
                <div className="relative flex flex-col">
                    <div className="p-6 w-full mx-auto max-w-3xl md:p-10 rounded-2xl border border-gray-100/10 dark:border-gray-900 shadow-2xl shadow-gray-700/40 dark:shadow-none ">
                        <Carousel>
                            <CarouselContent>
                                {reviews?.map((item) => (
                                    <CarouselItem key={item.id} className="flex flex-col justify-center items-center gap-5 ">
                                        <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
                                        <Image
                                            src={item.user.profile_image_url}
                                            width={1900}
                                            height={1300}
                                            alt="Author avatar"
                                            className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-full flex"
                                        />
                                        <div className="space-y-2 text-center flex-1">
                                            <h2 className="text-xl font-semibold leading-none text-gray-800 dark:text-gray-200">
                                                {item.user.first_name}{" "}{item.user.last_name} 
                                            </h2>
                                            <p className="text-sky-700 dark:text-sky-300">
                                                {item.place}
                                            </p>
                                        </div>
                                        <p className="font-medium text-sm md:text-md lg:text-md text-gray-700 dark:text-gray-300 h-fit w-1/2   text-wrap">
                                            {item.description}
                                        </p>
                                        <div className="mx-auto flex items-center gap-2">
                                        <Rating name="read-only" value={item.rating} readOnly />
                                        </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded-full text-gray-800 dark:text-gray-200 h-16 w-16" />
                            <CarouselNext className=" absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-gray-900 p-4 rounded-full text-gray-800 dark:text-gray-200 h-16 w-16" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default TestimonialSection;
