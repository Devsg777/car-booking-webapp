import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {userId} = auth();

        const support = await db.contactSupport.create({data:{...body}});
        return NextResponse.json(support);

    }catch(error){
   console.log('Error at /api/support  POST',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}
export async function GET(req:Request){
    try{
        
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const support = await db.contactSupport.findMany();
  
        return NextResponse.json(support);

    }catch(error){
   console.log('Error at /api/support  Get',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}

