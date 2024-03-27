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
        const car = await db.car.create({data:{...body}})
        return NextResponse.json(car);

    }catch(error){
   console.log('Error at /api/cars POST',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}
export async function GET(req:Request){
    try{
        
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const cars = await db.car.findMany({include:{driver:true}});
  
        return NextResponse.json(cars);

    }catch(error){
   console.log('Error at /api/cars  Get',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}

