import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

async function page() {
  const getDriverById = async () => {
    try {
      const driver = await db.driver.findMany();

      if (!driver) return null;

      return driver;
    } catch (err: any) {
      throw err;
    }
  };

  const drivers = await getDriverById();

  return (
    <div>
      <h2 className='text-2xl underline font-bold mb-10 ml-3'>Drivers</h2>
      <div className="border-2 mx-10 rounded-2xl ">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Sl.No</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Phone No.</TableHead>
              <TableHead className="">Place</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {drivers?.map((driver, i) => (
              <TableRow key={driver.id}>
                <TableCell className="ml-3 text-center">
                  <Link
                    href={`/dashboard/drivers/${driver.id}`}
                    className="font-bold"
                  >
                    {i + 1}
                  </Link>
                </TableCell>
                <TableCell className="text-center ">
                  <Link
                    href={`/dashboard/drivers/${driver.id}`}
                    className="font-bold flex justify-start items-center "
                  >
                    <Image
                      width={50}
                      height={50}
                      src={driver.image}
                      alt="driver Image"
                      className="object-cover w-12 h-12 mr-2 rounded-full"
                    /> {driver.name}
                  </Link>
      
                </TableCell>
                
                <TableCell className="">{driver.phoneNumber}</TableCell>
                <TableCell className="">{driver.nativePlace}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mr-10">
        <Button className="mt-10 bg-emerald-500" asChild><Link href={'/dashboard/drivers/new'}><PlusIcon className="mr-2  h-4 w-4"/>Add New</Link></Button>
      </div>
    </div>
  );
}

export default page;
