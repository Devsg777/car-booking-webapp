"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../../Common/SectionTitle";



const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section >
     <video width="100%" height="100%" autoPlay loop muted  >
                  <source src="/sdm.mp4" type="video/mp4" />
                  
                </video>



      
    </section>
  );
};

export default Video;
