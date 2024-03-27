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
        const driver = await db.driver.create({data:{...body}})
        return NextResponse.json(driver);

    }catch(error){
   console.log('Error at /api/drivers POST',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}

export async function GET(req:Request){
    try{
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const drivers = await db.driver.findMany();
        return NextResponse.json(drivers);
    }catch(error){
   console.log('Error at /api/drivers POST',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}