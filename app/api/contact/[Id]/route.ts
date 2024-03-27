import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function DELETE(req:Request,{params}:{params:{Id:string}}){
    try{ 
        const {userId} = auth();
        if(!params.Id){
            return new NextResponse('Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const message = await db.contactSupport.delete({where:{
            id:params.Id
        }})
        return NextResponse.json(message);

    }catch(error){
   console.log('Error at /api/car Delete',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}

