"use client";
import { Calendar, CalendarRange, PinIcon } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { IoIosPin } from "react-icons/io";
import { MdCurrencyRupee, MdMoney, MdOutlinePayments } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  IoAirplane,
  IoCall,
  IoLogoWhatsapp,
  IoMail,
  IoPerson,
  IoSpeedometerOutline,
} from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingUpdateForm } from "@/app/ui/dashboard/booking/BookingUpdateForm";

const Bookingpage = ({
  params: { bookingId },
}: {
  params: { bookingId: string };
}) => {
  const [data, setData] = useState<any>({} as any);

  useEffect(() => {
    axios
      .get(`/api/booking/${bookingId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      // Cleanup logic (if needed)
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }
  return (
    <>
      {data?.car && (
        <div className="px-3 lg:px-20 py-10">
          <div className="flex justify-between ">
            <div className="w-3/4">
              <h2 className="text-xl font-semibold ">
                Confirm This Reservation
              </h2>
              <p className="text-lg mb-3">
                <span className="text-lg font-semibold text-emerald-500">
                  {data?.serviceType}
                </span>{" "}
                Service.
              </p>
              <p
                className={clsx(
                  "flex items-center rounded-full px-2 py-1 my-4 text-sm w-fit",
                  {
                    "bg-gray-600 text-white": data.status === "Pending",
                    "bg-green-500 text-white": data.status === "Confirmed",
                    "bg-red-500 text-white": data.status === "Cancelled",
                    "bg-yellow-300 text-black": data.status === "ToCancel",
                  }
                )}
              >
                {data.status}
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-1">
                <div className="flex gap-1 items-center">
                  <Calendar />
                  PickUp Time:
                </div>
                <h3>{data?.startTime}</h3>
                {data?.endTime && (
                  <>
                    <div className="flex gap-1 items-center">
                      <CalendarRange />
                      Return Time:
                    </div>
                    <h3>{data?.endTime}</h3>
                  </>
                )}
                <div className="flex gap-1 items-center">
                  <p className="">
                    {data?.airportTaxi == "from-airport" ? (
                      <IoAirplane className=" " />
                    ) : (
                      <IoIosPin className="" />
                    )}
                  </p>
                  PickUp Location:
                </div>
                <h3 className="truncate">{data?.pickUpLocation}</h3>
                {data?.dropOutLocation && (
                  <>
                    <div className="flex gap-1 items-center">
                      <p className="">
                        {data?.airportTaxi == "to-airport" ? (
                          <IoAirplane className=" " />
                        ) : (
                          <IoIosPin className=" " />
                        )}
                      </p>
                      Drop Location:
                    </div>
                    <h3 className="truncate">{data?.dropOutLocation}</h3>
                  </>
                )}
                {data?.rentalPackage && (
                  <>
                    <div className="flex gap-1 items-center ">
                      <IoSpeedometerOutline />
                      Rental Package:
                    </div>
                    <h3>{data?.rentalPackage}</h3>
                  </>
                )}
                <div className="flex gap-1 items-center">
                  <MdOutlinePayments className="" />
                  Total Amount:
                </div>
                <div className="flex gap-1">
                  <h3 className="font-semibold  ">{data?.amount} Rs</h3>
                  <p className="text-sm ">
                    {data.paymentStatus ? "Paid" : "Unpaid"}
                  </p>
                </div>
                <h1>Distance:</h1>
                <h1>{data.distance} Km</h1>
              </div>
            </div>

            <div className="">
              <p className="bg-black text-white max-w-fit px-2 text-sm rounded-xl">
                Car Choosed
              </p>
              <Image
                src={data.car.image ? data.car.image : "/cars.png"}
                width={200}
                height={100}
                alt="car Image"
                className="w-32"
              />
              <div className="grid grid-cols-[2fr_3fr]">
                <p className="text-sm ">Car:</p>
                <p className="text-sm ">{data.car.name}</p>
                <p className="text-sm ">Model:</p>
                <p className="text-sm ">{data.car.model}</p>
                <p>Seats:</p>
                <p className="text-sm flex gap-1 items-center">
                  <IoPerson />
                  {data.car.seats}
                </p>
                <p>Price:</p>
                <p className="text-sm  flex gap-1 items-center">
                  <MdCurrencyRupee />
                  {data.car.price} per Km
                </p>
              </div>
            </div>
          </div>
          <Separator className="h-[2px] w-[95%] m-auto" />
          <div className="grid grid-cols-2">
            <div className="bg-gray-100 p-1 pl-5">
              <h3 className="text-xl font-semibold text-emerald-400 text-center">
                Driver Details
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <div>
                    {" "}
                    <Image
                      src={data.car.driver.image}
                      width={100}
                      height={100}
                      className="border-2 border-emerald-400  w-12 h-12 rounded-full"
                      alt={`${data.user.name} photo`}
                    />
                    <p>{data.car.driver.name}</p>
                  </div>
                </div>
                <Link
                  href={"mailto:" + data.car.driver.email}
                  className={"text-blue-500 flex items-center gap-3"}
                >
                  <IoMail className="text-2xl" />
                  <p>{data.car.driver.email}</p>
                </Link>
                <Link
                  href={"tel:" + data.car.driver.phoneNumber}
                  className={"text-blue-500 flex items-center gap-3"}
                >
                  <IoCall className="text-2xl" />
                  <p>{data.car.driver.phoneNumber}</p>
                </Link>
                <Link
                  href={"https://wa.me/" + data.car.driver.phoneNumber}
                  className={
                    " flex items-center gap-3"
                  }
                >
                  <IoLogoWhatsapp className="text-3xl text-white bg-green-600 rounded-full w-fit " />
                  <p>Send message</p>
                </Link>
              </div>
            </div>
            <div className="bg-gray-100 p-1 ">
              <h3 className="text-xl font-semibold text-emerald-400 text-center">
                Raider Details
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <div>
                    {" "}
                    <Image
                      src={data.user.profile_image_url}
                      width={100}
                      height={100}
                      className="border-2 border-emerald-500 w-12 h-12 rounded-full"
                      alt={`${data.user.name} photo`}
                    />
                    <p>
                      {data.user.first_name} {data.user.last_name}
                    </p>
                  </div>
                </div>
                <Link
                  href={"mailto:" + data.user.email}
                  className={"text-blue-500 flex items-center gap-3"}
                >
                  <IoMail className="text-2xl" />
                  <p>{data.user.email}</p>
                </Link>
                <Link
                  href={"tel:" + data.user.phone_number}
                  className={"text-blue-500 flex items-center gap-3"}
                >
                  <IoCall className="text-2xl" />
                  <p>{data.user.phone_number}</p>
                </Link>
                <Link
                  href={"https://wa.me/" + data.user.phone_number}
                  className={
                    " flex items-center gap-3"
                  }
                >
                  <IoLogoWhatsapp className="text-3xl text-white bg-green-600 rounded-full w-fit" />
                  <p>Send message</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Dialog>
              <DialogTrigger><Button className="bg-gray-300 text-black rounded-xl w-[90%] mx-10 hover:text-white mt-5">
                Confirm Here
              </Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change the Status</DialogTitle>
                </DialogHeader>
              <BookingUpdateForm id={data.id}/>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookingpage;
