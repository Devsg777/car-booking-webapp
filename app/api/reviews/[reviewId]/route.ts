import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{reviewId:string}}){
    try{ 
        const body = await req.json();
        const {userId} = auth();
        if(!params.reviewId){
            return new NextResponse('Car Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const review = await db.reviews.update({where:{
            id:params.reviewId
        },data:{...body}})
        return NextResponse.json(review);

    }catch(error){
   console.log('Error at /api/Cars/ Update',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}

export async function DELETE(req:Request,{params}:{params:{reviewId:string}}){
    try{ 
        const {userId} = auth();
        if(!params.reviewId){
            return new NextResponse('Car Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const review = await db.reviews.delete({where:{
            id:params.reviewId
        }})
        return NextResponse.json(review);

    }catch(error){
   console.log('Error at /api/driver Delete',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}
