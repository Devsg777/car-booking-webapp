import React from "react"
import Footer from "../ui/home/Footer"
import Header from "../ui/home/Header"
import DashobrdLink from "../ui/home/DashobrdLink"



export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (<>
           <DashobrdLink />
           <Header />
            <div className="">
                {children}
            </div>
            <Footer />
            
       

    </>)

}
