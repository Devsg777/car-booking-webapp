import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try{
        
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const userData = await db.user.findMany({where:{userID:userId}})
        const bookings = await db.booking.findMany({where:{userId:userData[0].id},include:{car:true}});
  
        return NextResponse.json(bookings);

    }catch(error){
   console.log('Error at /api/bookings single  Get',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}