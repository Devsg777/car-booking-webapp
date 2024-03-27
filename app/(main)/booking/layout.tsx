import React from 'react';
import MapSection from '@/app/ui/Booking/MapSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import ShowBookingForm from '@/app/ui/Booking/ShowBookingForm';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (

        <section className='mx-4 lg:mx-10 mt-20 min-h-screen '>
             <ShowBookingForm/>
            <div className='gap-10 min-h-screen grid grid-cols-1  lg:grid-cols-2  mb-14'>       
        <div className='h-[50vh]'>
        <ScrollArea className=" rounded-md border h-[50vh] lg:h-[80vh]">
          {children}
        </ScrollArea>
        </div>
        <div className='h-[50vh] lg:h-[90vh] w-full rounded-2xl'>
            <MapSection />
        </div>
    </div></section>
    )
}

export default layout