import React from 'react'
import Booking from '../home/Booking'


const ShowBookingForm = () => {
  return (
    <>
        <div className='px-10  pb-14 pt-3'>
            <h2 className="mb-4 text-lg font-semibold !leading-tight text-emerald-500 dark:text-white sm:text-2xl ">
          Book a Tripe
        </h2>
            <Booking/></div>
    </>
  )
}

export default ShowBookingForm