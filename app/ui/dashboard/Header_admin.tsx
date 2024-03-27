
import React from 'react'
import ThemeToggle from '../ThemeToggle'
import { UserButton } from '@clerk/nextjs'

function Header_admin() {
  return (
    <>
    <nav className=' bg-white dark:bg-gray-950 h-12 flex justify-end items-center w-full shadow-sm dark:shadow-slate-800'>
   <div className='text-5xl flex items-center '> <UserButton/> <ThemeToggle/></div>
    </nav>
  </>
  )
}

export default Header_admin