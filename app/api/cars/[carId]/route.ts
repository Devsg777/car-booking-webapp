import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{carId:string}}){
    try{ 
        const body = await req.json();
        const {userId} = auth();
        if(!params.carId){
            return new NextResponse('Car Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const car = await db.car.update({where:{
            id:params.carId
        },data:{...body}})
        return NextResponse.json(car);

    }catch(error){
   console.log('Error at /api/car update',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}
export async function DELETE(req:Request,{params}:{params:{carId:string}}){
    try{ 
        const {userId} = auth();
        if(!params.carId){
            return new NextResponse('Car Id is  required ', {status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401}) 
        }
        const car = await db.car.delete({where:{
            id:params.carId
        }})
        return NextResponse.json(car);

    }catch(error){
   console.log('Error at /api/car Delete',error);
   return new NextResponse("Internal Server Error",{status:500})
    }
}

