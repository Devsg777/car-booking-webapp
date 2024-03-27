"use client"
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx';
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';

const navItems = [
    {
        id: 1,
        text: "Home",
        link: "/"
    },
    {
        id: 2,
        text: "About",
        link: "/about"
    },
    {
        id: 3,
        text: "Booking",
        link: "/booking"
    },
    {
        id: 4,
        text: "Contact Us",
        link: "/contact"
    }
]

const Header = () => {
    const ThemeToggle = dynamic(() => import('@/app/ui/ThemeToggle'));
const UserButton = dynamic(() => import('@clerk/nextjs').then((mod) => mod.UserButton ),);

const {user} = useUser();

    const [openNavbar, setOpenNavbar] = useState(false)
    const toggleNavbar = () => {
        setOpenNavbar(openNavbar => !openNavbar)
    }
    const closeNavbar = () => {
        setOpenNavbar(false)
    }
    useEffect(() => {
        // Your client-side code for ThemeToggle or UserButton
        // Replace the following comments with your actual code
        // Example:
        // ThemeToggle.init(); // Replace with actual initialization
        // UserButton.init(); // Replace with actual initialization
    }, [])

    return (
        <>
            <div onClick={() => { closeNavbar() }} aria-hidden="true" className={
                `fixed bg-gray-800/40 inset-0 z-30 ${openNavbar ? "flex lg:hidden" : "hidden"}`
            } />
            <header className=" z-[50] fixed inset-x-0 top-0 h-20 flex items-center  bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 backdrop-blur-3xl">
                <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 relative ">
                    <nav className="flex items-center justify-between w-full relative">
                        <div className="inline-flex relative bg-inherit">
                            <Link href="/" className="flex items-center gap-2">
                                <span className="flex">
                                    <Image src={'/logo.png'} width={1000} height={760} alt='logo' className='w-auto' />

                                </span>
                            </Link>
                        </div>
                        <div className={`
                        absolute top-10 px-5 sm:px-8   md:px-12 lg:z-auto
                        lg:px-0 lg:pt-0 lg:top-0 
                        bg-white dark:bg-gray-950 lg:dark:bg-transparent  rounded-xl border border-gray-200 
                        dark:border-gray-800 shadow-lg shadow-gray-100 dark:shadow-transparent  
                        lg:border-none lg:shadow-none lg:rounded-none lg:bg-transparent 
                        w-full lg:justify-between py-6 lg:py-0 lg:relative flex flex-col lg:flex-row transition-all duration-300 ease-linear origin-top
                        ${openNavbar ? "" : "invisible opacity-20 translate-y-6 lg:visible lg:opacity-100 lg:translate-y-0"}
                    `}>
                            <ul className="text-gray-700 dark:text-gray-100 w-full flex lg:items-center gap-y-4 lg:gap-x-8 flex-col lg:flex-row lg:w-full lg:justify-center">
                                {
                                    navItems.map(navItem => (
                                        <li key={navItem.id}>
                                            <Link href={navItem.link} className={clsx(" scroll-smooth transition hover:text-emerald-500 ease-linear text-lg")}    >{navItem.text}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="lg:min-w-max flex flex-col lg:flex-row lg:items-center gap-4 mt-8 lg:mt-0 w-full sm:w-max">

                                <Link href="/mybookings" className="px-7 relative text-emerald-500  h-12 flex w-full sm:w-max justify-center items-center before:bg-emerald-500/5 dark:before:bg-emerald-500/10 before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105   active:before:scale-95">
                                    <span className="relative text-emerald-500">My trips</span>
                                </Link>
                                {user?<UserButton/>: <Link href="/sign-in" className="px-7 relative text-white h-12 flex w-full sm:w-max justify-center items-center before:bg-emerald-500 before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95">
                                    <span className="relative text-white">Sign In</span>
                                </Link>}
                            </div>
                        </div>
                        <div className="flex ml-2 pl-2 border-l border-gray-100 dark:border-gray-800 min-w-max items-center gap-x-3">
                            <ThemeToggle />
                            <button onClick={() => { toggleNavbar() }} aria-label='toggle navbar' className="outline-none lg:hidden w-7 h-auto flex flex-col relative children:flex">
                                <span aria-hidden="true" className={`
                                w-6 origin-right h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                                ${openNavbar ? "-rotate-[40deg] -translate-y-[0.375rem] scale-x-100" : " scale-x-75"}
                            `} />
                                <span aria-hidden="true" className={`
                                w-6 origin-center mt-1 h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                                ${openNavbar ? "opacity-0 scale-x-0" : ""}
                            `} />
                                <span aria-hidden="true" className={`
                                w-6 origin-right mt-1 h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                                ${openNavbar ? "rotate-[40deg] -translate-y-[0.150rem] scale-x-100" : "scale-x-50"}
                            `} />
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;

