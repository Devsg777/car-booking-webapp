'use client'
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { IoIosCar } from "react-icons/io";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import CountUp from 'react-countup';

const Counter = () => {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">Numbers That Maters</h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-900 p-6 sm:px-12 grid sm:grid-cols-2 gap-5 md:grid-cols-4 text-gray-700 dark:text-gray-300 rounded-lg relative">
                    <div className="absolute right-0 top-0 h-full w-full flex justify-end">
                        <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-3xl">
                            <span className="absolute w-16 h-16 -top-1 -right-1 bg-emerald-500 rounded-md rotate-45" />
                            <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#8cd66a] rounded-md rotate-45" />
                        
                        </div>
                    </div>
                    <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
                        <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-3xl">
                            <span className="absolute w-16 h-16 -top-1 -right-1 bg-emerald-500 rounded-md rotate-45" />
                            <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#8cd66a] rounded-md rotate-45" />
                            
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <span className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            <FaRegFaceGrinBeam className="text-4xl"/>
                        </span>
                        <p className="font-semibold text-2xl sm:text-4xl text-gray-900 dark:text-white">
                            <CountUp end={100} enableScrollSpy />+
                        </p>
                        <span className="text-center">
                        Happy Customers 
                        </span>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <span className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            <IoIosCar className="text-4xl"/>
                        </span>
                        <p className="font-semibold text-2xl sm:text-4xl text-gray-900 dark:text-white">
                        <CountUp end={1} enableScrollSpy/>K+
                        </p>
                        <span className="text-center">
                        Vehical to Choose from
                        </span>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <span className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            <MdOutlineEnergySavingsLeaf className="text-4xl"/>
                        </span>
                        <p className="font-semibold text-2xl sm:text-4xl text-gray-900 dark:text-white">
                        <CountUp end={85} enableScrollSpy/>K+
                        </p>
                        <span className="text-center">
                        Carbon emissions saved (kg)
                        </span>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <span className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            <IoPeopleSharp className="text-4xl"/>
                        </span>
                        <p className="font-semibold text-2xl sm:text-4xl text-gray-900 dark:text-white">
                        <CountUp end={96} enableScrollSpy/>+
                        </p>
                        <span className="text-center">
                        24/7 support staff
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Counter