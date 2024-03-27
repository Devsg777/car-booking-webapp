import Image from "next/image";
import {  ReactNode } from "react";
import { TbCertificate } from "react-icons/tb";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdOutlineMoreTime } from "react-icons/md";
import { BsTaxiFrontFill } from "react-icons/bs";

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
    <div className="p-3 rounded-md bg-white dark:bg-gray-950 shadow-lg dark:shadow-none hover:shadow-emerald-600/20 shadow-transparent transition-all ease-linear border border-gray-100 hover:border-gray-100 dark:border-gray-900 dark:hover:border-gray-600">
      <div className="flex gap-4">
        <div className="min-w-max">
          <span className="flex text-emerald-600 dark:text-gray-100 aspect-square rounded bg-emerald-600/10 dark:bg-gray-900 p-3 text-3xl">
            {icon}
          </span>
        </div>
        <div className="space-y-0.5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Advantages = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: "Own Fleets",
      description: "We own our fleet, so you can trust us",
      icon: <BsTaxiFrontFill/>
    
    },
    {
      id: 2,
      title: "Professional Chauffeurs",
      description: "Experienced drivers for safe rides",
      icon: <TbCertificate />,
    },
    {
      id: 3,
      title: "Safety first",
      description: "Our vehicles have everything to keep you safe",
      icon: <MdOutlineHealthAndSafety/>,
    },
    {
      id: 4,
      title: "Long-term options",
      description: "Flexible agreements for extended travel needs",
      icon: <MdOutlineMoreTime/>,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-10 xl:gap-14">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h2 className="text-4xl lg:text-4xl font-bold text-gray-800 dark:text-white">
              Our Advantages 
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="space-y-3">
            {features.map((feature) => (
              <FeatureItem key={feature.id} {...feature} />
            ))}
          </div>
        </div>
        <div className="w-full md:h-auto object-cover flex md:items-end justify-center md:w-1/2 xl:w-[45%] relative">
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-tr from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700 rounded-3xl" />
                    <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
                        <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-3xl">
                            <span className="absolute w-16 h-16 -top-1 -right-1 bg-emerald-500 rounded-md rotate-45" />
                            <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#8cd66a] rounded-md rotate-45" />
                            
                        </div>
                    </div>
          <Image src="/car.png" width={1001} height={1001} alt="woman with grocery" className="wfull h-auto lg:w-[86%] relative" />
        </div>
      </div>
    </section>
  );
};

export default Advantages;
