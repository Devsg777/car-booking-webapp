import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{bookingId:string}}){
    try{
        console.log(params.bookingId);
        const body = await req.json();
        const {userId} = auth();
        if(!params.bookingId){
            return new NextResponse('Booking  Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        
        const booking = await db.booking.update({
            where:{
                id:params.bookingId
            },
            data:{
                ...body
            }
        })
        return NextResponse.json(booking);
    }catch(error){
        console.log('Error at /api/booking update',error);
        return new NextResponse("Internal Server Error",{status:500})
    
}
}

export async function GET(req:Request,{params}:{params:{bookingId:string}}){
    try{
        const {userId} = auth();
        if(!params.bookingId){
            return new NextResponse('Payment-Intent  Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const booking = await db.booking.findUnique({
            where:{
                id:params.bookingId
            },
            include:{user:true, car:{include:{driver:true}}},
           
        })
        return NextResponse.json(booking);
    }catch(error){
        console.log('Error at /api/booking get',error);
        return new NextResponse("Internal Server Error",{status:500})
    
}
}