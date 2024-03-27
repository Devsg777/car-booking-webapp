"use client"
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoIosHome } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";

const navItems = [
{
    id: 1,
    icon: <MdDashboard/>,
    link: "/dashboard",
    text: "Dashboard",
},
{
    id: 2,
    icon: <MdOutlineCollectionsBookmark/>,
    link: "/dashboard/bookings",
    text: "Bookings",
    
},
{
    id: 3,
    icon: <FaUsers/>,
    link: "/dashboard/customers",
    text: "Customers",
    
},
{
    id: 4,
    icon: <HiOutlineIdentification/>,
    link: "/dashboard/drivers",
    text: "Drivers",
    
},
{
    id: 5,
    icon: <IoCarSportSharp/>,
    link: "/dashboard/cars",
    text: "Cars",
    
},
{
    id: 6,
    icon: <MdOutlineRateReview/>,
    link: "/dashboard/reviews",
    text: "Reviews",
    
},

]
const Sidebar = ({sidebarResized,sidebarToggled,toggleSidebar,resizeSidebar}:any) => {
   


const navPath =usePathname()

return (
    <>
        <aside className={`
        fixed h-[100dvh] overflow-hidden lg:static w-11/12 max-w-[18rem] md:w-72 transition-all rounded-r-2xl bg-white dark:bg-gray-950 shadow-lg shadow-gray-200/40 dark:shadow-gray-800/60 flex flex-col justify-between px-4 lg:transition-[width] ease-linear
        ${sidebarToggled ? "" : "-translate-x-full lg:-translate-x-0"}
        ${sidebarResized ? "lg:w-20" : ""}
    `}>
            <div className="min-h-max py-4 border-b border-b-gray-200 dark:border-b-gray-800">
                <Link href="/dashboard" data-logo-box className="flex items-center gap-x-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    <span className="w-12 h-12 min-w-[2.75rem] rounded-md  text-white flex items-center justify-center">
                        <Image src={'/logo1.png'} width={1000} height={760} alt='logo'/>
                    </span>
                    <span className={`
                    ${sidebarResized ? "lg:invisible" : ""}
                `}>SDM e-mobility</span>
                </Link>
            </div>
            <nav className="h-full pt-10">
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    {
                        navItems.map(navItem => (
                            <li key={navItem.id}>
                                <Link href={navItem.link} className={clsx('flex items-center gap-x-4 px-3 py-2.5 rounded-md',
                                {'bg-gray-200 dark:bg-gray-800    text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900':navPath===navItem.link}                            )}>
                                    <span className="min-w-max inline-flex text-2xl">
                                        {navItem.icon}
                                    </span>
                                    <span className={`
                                    inline-flex ease-linear transition-colors duration-300
                                    ${sidebarResized ? "lg:invisible" : ""}`}>
                                        {navItem.text}
                                    </span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            
            <div className="min-h-max py-2 hidden lg:flex flex-col justify-between bg-transparent">
           <div className='flex flex-col  gap-5 mb-5'> <Link href={'/'} className='rounded-2xl h-10 w-10 dark:text-white dark:bg-gray-900 bg-slate-100 text-xl flex justify-center items-center'><IoIosHome/></Link>
            <button className='rounded-2xl h-10 w-10 bg-slate-100 text-xl flex justify-center items-center dark:text-white dark:bg-gray-900'><FiLogOut/></button></div>
                <button onClick={() => { resizeSidebar() }} className={`
                outline-none bg-gray-100 dark:bg-gray-900 rounded-md text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 ease-linear transition-transform  w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center
                ${sidebarResized ? "rotate-180" : ""}
            `}>
                    <span className="sr-only">toggle sidebar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </aside>
        <main>
            <div className="flex lg:hidden fixed right-20 -top-1 p-2">
                <button onClick={() => { toggleSidebar() }} className="p-2 rounded-full  outline-none w-10 aspect-square flex flex-col relative justify-center items-center">
                    <span className="sr-only">
                        toggle sidebar
                    </span>
                    <span className={`
                        w-6 h-0.5 rounded-full bg-gray-900 dark:bg-slate-100 transition-transform duration-300 ease-linear
                        ${sidebarToggled ? "rotate-[40deg] translate-y-1.5" : ""}
                    `} />
                    <span className={`
                        w-6 origin-center  mt-1 h-0.5 rounded-full bg-gray-900 dark:bg-slate-100 transition-all duration-300 ease-linear
                        ${sidebarToggled ? "opacity-0 scale-x-0" : ""}
                    `} />
                    <span className={`
                        w-6 mt-1 h-0.5 rounded-full bg-gray-900 dark:bg-slate-100 transition-all duration-300 ease-linear
                        ${sidebarToggled ? "-rotate-[40deg] -translate-y-1.5" : ""}
                    `} />
                </button>
                
            </div>
           
        </main>
    </>
)
}
export default Sidebar