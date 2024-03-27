import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const getBooking = async ()=>{
    try{

        const user = await currentUser();
        if(user){
            const userData = await db.user.findMany({where:{userID:user.id}});
            const bookings = await db.booking.findMany({where:{userId:userData[0].id}});
            console.log(bookings);
            return bookings;
        }
        
    }catch(err:any){
        console.log(err);
        throw new Error(err);
    }
}