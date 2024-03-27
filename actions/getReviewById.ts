import { db } from "@/lib/db";

export const getReviewById =async(reviewId:string)=>{

try{
    if (!isValidObjectId(reviewId)) {
        return null
      }

    const review = await db.reviews.findUnique({
        where: {
          id:reviewId,
        },
      });

    if(!review) return null;

    return review

}catch(err:any){
    throw err;
}
}
function isValidObjectId(id: string): boolean {
    // Replace this with your actual validation logic
    return /^[0-9a-fA-F]{24}$/.test(id);
  }