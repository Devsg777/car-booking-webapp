'use client'
import {useState } from 'react';
import Sidebar from './Sidenav';
import Header_admin from './Header_admin';
import clsx from 'clsx';


const DashLayout = ({ children }: { children: React.ReactNode }) => {

    const [sidebarToggled, setSidebarToggled] = useState(false)
    const [sidebarResized, setSidebarResized] = useState(false)
    const toggleSidebar = () => {
        setSidebarToggled(sidebarToggled => !sidebarToggled)
    }
    const resizeSidebar = ()=> {
        setSidebarResized(sidebarResized => !sidebarResized)
    }

  return (
    <><div className="fixed left-0 top-0 z-50">
    <Sidebar sidebarToggled={sidebarToggled} sidebarResized={sidebarResized} toggleSidebar={toggleSidebar} resizeSidebar={resizeSidebar}/> 
  </div>
  <div className={clsx("flex-grow flex-shrink ml-20",{"lg:ml-72":!sidebarResized})}>
    <Header_admin/>
    <section className="">{children}</section>
    </div>
    </>
  )
}

export default DashLayout