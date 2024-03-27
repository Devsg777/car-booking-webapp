import Image from "next/image";
import { MdFreeCancellation } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";
import { RiHandCoinLine } from "react-icons/ri";

const Features = () => {
  return (
    <section className="py-32 ">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 ">
        <div className="flex flex-col  space-y-16 ">
          <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5">
            <span className="rounded-lg bg-blue-50 dark:bg-gray-900 px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-emerald-800 dark:text-gray-100">
            Features
            </span>
            <h1 className="text-3xl font-semibold text-blue-950 dark:text-gray-200 md:text-4xl xl:text-5xl leading-tight">
            What We Offer
            </h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
              odio consequatur aliquam ratione quod iusto aspernatur
            </p>
          </div>
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4 lg:items-center">
            <div className="order-1 grid gap-10 sm:grid-cols-2 md:order-1 md:grid-cols-1 lg:order-1">
              <div className="flex flex-col space-y-6 justify-center md:justify-start ">
                <span className="p-2 rounded-md bg-blue-50 text-emerald-500 text-4xl dark:bg-purple-900 dark:text-purple-500 flex w-max">
                  <MdFreeCancellation />
                </span>
                <h1 className="flex text-lg font-semibold capitalize text-gray-900 dark:text-white">
                  Hassel Free Booking
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                  Our platform offers hassle-free access to our fleet of
                  electric vehicles, providing a greener and more convenient way
                  to travel
                </p>
              </div>
              <div className="flex flex-col space-y-6 justify-center md:justify-start">
                <span className="p-2 rounded-md bg-blue-50 text-emerald-500 dark:bg-purple-900 dark:text-purple-500 flex w-max text-4xl">
                  {/* feature icon */}
                  <IoTimeOutline />
                </span>
                <h1 className="flex text-lg font-semibold capitalize text-gray-900 dark:text-white">
                  24/7 Support-
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                  Enjoy peace of mind with our 24/7 support, ensuring
                  assistance whenever you need it.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center order-3 md:col-span-2 lg:order-2 lg:row-span-2 lg:h-full">
              <div
                className="flex-1 relative 
                  p-6 rounded-lg aspect-[4/2.4]  backdrop-blur-2xl opacity-900"
              >
                <div className="absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0  bg-gradient-to-tr opacity-25 from-emerald-500 to-pink-300 dark:from-[#570cac] dark:to-emerald-500 blur-2xl"></div>
                <div className="absolute w-full h-full z-10 p-1 -translate-y-1/2 top-1/2 right-3 rounded-3xl bg-whitee dark:bg-gray-950  shadow-lg shadow-gray-100 dark:shadow-transparent  border border-gray-200 dark:border-gray-800">
                  <Image
                    src="/sdm_cars.JPG"
                    alt="In studio"
                    width={900}
                    height={900}
                    loading="lazy"
                    className="w-full h-full rounded-2xl object-cover "
                  />
                </div>
              </div>
            </div>
            <div className="order-1 grid gap-10 sm:grid-cols-2 md:order-2 md:grid-cols-1 lg:order-3">
              <div className="flex flex-col space-y-6 justify-center md:justify-start">
                <span className="p-2 rounded-md bg-blue-50 text-emerald-500 dark:bg-purple-900 dark:text-purple-500 flex w-max text-4xl">
                  {/* feature icon */}
                  <RiSecurePaymentFill />
                </span>
                <h1 className="flex text-lg font-semibold capitalize text-gray-900 dark:text-white">
                  Payment Option
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                  Experience effortless payments with our convenient
                  payment options.
                </p>
              </div>
              <div className="flex flex-col space-y-6 justify-center md:justify-start">
                <span className="p-2 rounded-md text-4xl bg-blue-50 text-emerald-500 dark:bg-purple-900 dark:text-purple-500 flex w-max">
                  {/* feature icon */}
                  <RiHandCoinLine />
                </span>
                <h1 className="flex text-lg font-semibold capitalize text-gray-900 dark:text-white">
                  Reliable Services
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                  Trust in our reliable service to meet your
                  transportation needs consistently
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
