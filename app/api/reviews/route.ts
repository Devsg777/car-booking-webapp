import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {userId} = auth();
       
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const userData = await db.user.findMany({where:{userID:userId}})
        const reviews = await db.reviews.create({data:{...body,userId:userData[0].id}})
        return NextResponse.json(reviews);

    }catch(error){
   console.log('Error at /api/reviews POST',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}

export async function GET(req:Request){
    try{
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const reviews = await db.reviews.findMany();
        return NextResponse.json(reviews);
    }catch(error){
   console.log('Error at /api/reviews GET',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}