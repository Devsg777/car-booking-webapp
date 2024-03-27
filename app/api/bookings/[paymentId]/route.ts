import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{paymentId:string}}){
    try{
        console.log(params.paymentId);
        const {userId} = auth();
        if(!params.paymentId){
            return new NextResponse('Payment-Intent  Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        
        const booking = await db.booking.updateMany({
            where:{
                paymentId:params.paymentId
            },
            data:{
                paymentstatus:true
            }
        })
        return NextResponse.json(booking);
    }catch(error){
        console.log('Error at /api/bookings update',error);
        return new NextResponse("Internal Server Error",{status:500})
    
}
}

export async function DELETE(req:Request,{params}:{params:{paymentId:string}}){
    try{
        const {userId} = auth();
        if(!params.paymentId){
            return new NextResponse('Payment-Intent  Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const booking = await db.booking.deleteMany({
            where:{
                paymentId:params.paymentId
            }
        })
        return NextResponse.json(booking);
    }catch(error){
        console.log('Error at /api/bookings delete',error);
        return new NextResponse("Internal Server Error",{status:500})
    
}
}