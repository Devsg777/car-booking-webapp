import BookingDataTable from '@/app/ui/dashboard/booking/BookingDataTable'
import React from 'react'

const page = () => {
  return (
    <div>
      <h2 className='text-2xl underline font-bold mb-10 ml-3'>Bookings</h2><BookingDataTable/></div>
  )
}

export default page