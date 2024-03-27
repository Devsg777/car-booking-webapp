
import {  ReactNode } from "react";
import { FaRoute } from "react-icons/fa";
import { GiCarKey } from "react-icons/gi";
import { MdEmojiTransportation } from "react-icons/md";
import { FaTruckPlane } from "react-icons/fa6";

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
};

type FeatureItemProps = {
  title: string;
  description: string;
  icon: ReactNode;
};



const FeatureItem = ({ title, description, icon }: FeatureItemProps) => {
  return (
    <div className="p-3 rounded-md bg-white dark:bg-gray-950 shadow-lg dark:shadow-none hover:shadow-emerald-600/20 shadow-transparent transition-all ease-linear border border-gray-300 hover:border-gray-100 dark:border-gray-900 dark:hover:border-gray-600 h-60 ">
      <div className="flex flex-col gap-4">
        <div className="w-20 h-20">
          <span className="flex text-emerald-600 dark:text-gray-100 aspect-square rounded bg-emerald-600/10 dark:bg-gray-900 p-3 text-3xl">
            {icon}
          </span>
        </div>
        <div className="space-y-0.5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ServiceCards = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: "Out Station",
      description: "We own our fleet, so you can trust us We own our fleet, so you can trust us",
      icon: <FaRoute className="w-full h-full "/>
    
    },
    {
      id: 2,
      title: "Rental",
      description: "Experienced drivers for safe rides We own our fleet, so you can trust us",
      icon: <GiCarKey className="w-full h-full " />,
    },
    {
      id: 3,
      title: "Airport Transfer",
      description: "Our vehicles have everything to keep you safe We own our fleet, so you can trust us",
      icon: <FaTruckPlane className="w-full h-full "/>,
    },
    {
      id: 4,
      title: "City Ride",
      description: "Flexible agreements for extended travel needs We own our fleet, so you can trust us",
      icon: <MdEmojiTransportation className="w-full h-full "/>,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-10 xl:gap-14">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h2 className="text-4xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                Our Services
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">We own our fleet, so you can trust us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-5 backdrop:blur-lg border-black">
            {features.map((feature) => (
              <FeatureItem key={feature.id} {...feature} />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ServiceCards;
