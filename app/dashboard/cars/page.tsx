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
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdCurrencyRupee } from "react-icons/md";
import { getCars } from "@/actions/getCars";

async function page() {
const cars = await getCars();

  return (
    <div>
      <h2 className='text-2xl underline font-bold mb-10 ml-3'>Cars</h2>
      <div className="border-2 mx-10 rounded-2xl ">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="ml-3">Sl.No</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Models</TableHead>
              <TableHead className="">Seats</TableHead>
              <TableHead className="">Price Rs/km</TableHead>
              <TableHead className="">Driver assigned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars?.map((car, i) => (
              <TableRow key={car.id}>
                <TableCell className="ml-3">
                  <Link
                    href={`/dashboard/cars/${car.id}`}
                    className="font-bold"
                  >
                    {i + 1}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/cars/${car.id}`}
                    className="font-bold"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={car.image}
                      alt="car Image"
                      className="object-cover rounded-xl"
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/cars/${car.id}`}
                    className="font-bold"
                  >
                    {car.name}
                  </Link>
                </TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell className="">{car.seats}</TableCell>
                <TableCell className=""><div className="flex items-center gap-1 font-semibold"><MdCurrencyRupee/>{car.price}</div></TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/drivers/`}
                    className="font-bold"
                  >
                    {car.driver?.name}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mr-10">
        <Button className="mt-10 bg-emerald-500" asChild>
          <Link href={"/dashboard/cars/new"}>
            <PlusIcon className="mr-2  h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default page;
