import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMail } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";


function Footer() {
    return (
        <footer className=" bg-gradient-to-tr from-gray-700 to-gray-900 rounded-t-2xl dark:from-gray-900 text-gray-100 dark:text-gray-300">
            <div className="grid grid-cols-4  gap-10 text-gray-100 dark:text-gray-300 py-20 px-10">
                <div className=" col-span-4  lg:col-span-2 flex gap-10 flex-col">
                    <Image src="/logo.png" width={150} height={150} alt="logo" />
                    <p className="text-sm">SDM E-Mobility Services Pvt Ltd. is changing the way people travel in India. With
                        a strong focus on sustainability and convenience, we&apos;re leading the shift towards
                        electric cab services, making transportation greener and more accessible
                    </p>
                    <li className="flex gap-5 text-2xl  "><Link className="hover:scale-150 hover:text-emerald-500 transition-all duration-900 " href={""}><RiInstagramFill /></Link><Link className="hover:scale-150 hover:text-emerald-500 transition-all duration-900 curpo" href={""}><FaFacebook /></Link> <Link className="hover:scale-150 hover:text-emerald-500 transition-all duration-900 curpo" href={""}><FaYoutube /></Link></li>
                </div>

                <div className="col-span-2 lg:col-span-1">
                    <h2 className="text-xl font-semibold  text-emerald-500 pb-5">Useful links</h2>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li><Link href="">Home</Link></li>
                        <li><Link href="">About</Link></li>
                        <li><Link href="">Services</Link></li>
                        <li><Link href="">Benefits</Link></li>
                    </ul>
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <h2 className="text-xl font-semibold  text-emerald-500 pb-5">Contact Us</h2>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li className=""><Link className='flex items-center gap-3' href=""><IoMail className="hover:scale-150 hover:text-emerald-500 transition-all duration-900 " size={25} />care@sdm-emobility.com</Link></li>
                        <li><Link href="" className='flex items-center gap-3'><IoMdCall className="hover:scale-150 hover:text-emerald-500 transition-all duration-900 " size={25} />+91 9899338378</Link></li>
                    </ul>
                </div>

            </div>
            <div className="w-screen flex justify-center items-center h-32 text-base-w flex-col">
                <hr className="w-3/4 mb-5" />
                <p className="text-sm ">Copyright 2024 - SDM e-moblitiy | All rights reserved
                </p>
            </div>

        </footer>
    );
}

export default Footer;
