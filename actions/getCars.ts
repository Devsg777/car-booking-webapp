import { db } from "@/lib/db";

export const getCars = async () => {
    try {
      const cars = await db.car.findMany({include:{driver:true}});

      if (!cars) return null;

      return cars;
    } catch (err: any) {
      throw err;
    }
  };
