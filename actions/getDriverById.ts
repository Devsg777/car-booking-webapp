import { db } from "@/lib/db";

export const getDriverById =async(driverId:string)=>{

try{
    if (!isValidObjectId(driverId)) {
        return null
      }

    const driver = await db.driver.findUnique({
        where: {
          id:driverId,
        }
      });

    if(!driver) return null;

    return driver

}catch(err:any){
    throw err;
}
}
function isValidObjectId(id: string): boolean {
    // Replace this with your actual validation logic
    return /^[0-9a-fA-F]{24}$/.test(id);
  }