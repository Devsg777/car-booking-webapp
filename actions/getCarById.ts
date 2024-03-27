import { db } from "@/lib/db";

export const getCarById =async(carId:string)=>{

try{
    if (!isValidObjectId(carId)) {
        return null
      }

    const car = await db.car.findUnique({
        where: {
          id:carId,
        },
        include: {
          driver: true,
        },
      });

    if(!car) return null;

    return car

}catch(err:any){
    throw err;
}
}
function isValidObjectId(id: string): boolean {
    // Replace this with your actual validation logic
    return /^[0-9a-fA-F]{24}$/.test(id);
  }