import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try{
        
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const users = await db.user.findMany({include:{Bookings:true,Reviews:true,DriverReview:true}});
        return NextResponse.json(users);

    }catch(error){
   console.log('Error at /api/users  Get',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}