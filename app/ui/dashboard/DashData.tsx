'use client'
import React, { useEffect, useState } from 'react'
import CardStats from './CardStats';
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi";
import axios from 'axios';
const DashData = () => {

const [book,setBook] = useState<any>([]);
const [user,setUser] = useState<any>([]);
const [car,setCar] = useState<any>([]);
const [drivers,setDrivers] = useState<any>([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get('/api/bookings').then((res) => setBook(res.data)).catch((err) => console.log(err));
        axios.get('/api/user').then((res) => setUser(res.data)).catch((err) => console.log(err));
        axios.get('/api/cars').then((res) => setCar(res.data)).catch((err) => console.log(err));
        axios.get('/api/drivers').then((res) => setDrivers(res.data)).catch((err) => console.log(err));
      }, []);
      console.log(book,user)
  return (
    <>
    <CardStats title="Total Users" total={user.length} >
    <FaUsers/>
  </CardStats>
    <CardStats title="Total Bookings" total={book.length} >
    <MdOutlineCollectionsBookmark/>
  </CardStats>
  <CardStats title="Total Drivers" total={drivers.length}>
    <HiOutlineIdentification/>
  </CardStats>
  <CardStats title="Total Car" total={car.length}>
    <IoCarSportSharp/>
  </CardStats></>
  )
}

export default DashData