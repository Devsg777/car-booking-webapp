import Link from "next/link";
import { IoIosCall } from "react-icons/io";

const Banner = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900">
          <div className="absolute right-0 top-0 h-full w-full flex justify-end">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-16 h-16 -top-1 -right-1 bg-emerald-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#8cd66a] rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-purple-600 rounded-md rotate-45" />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-16 h-16 -top-1 -right-1 bg-emerald-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#8cd66a] rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
            </div>
          </div>
          <div className="mx-auto text-center max-w-full md:max-w-full relative space-y-8">
            <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-bold text-blue-950 dark:text-white">
              Call for Booking{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-[#8cd66a] from-20% via-30% ">
                +91 99009 92290{" "}
              </span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              delectus architecto ullam earum
            </p>
            <div className="mx-auto max-w-md sm:max-w-xl flex justify-center">
              <Link
                href="tel:+919900992290"
                className="outline-none h-12 px-5 rounded-xl bg-emerald-500 text-white flex items-center gap-5"
              >
                <IoIosCall className="text-3xl" /> Get In touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
