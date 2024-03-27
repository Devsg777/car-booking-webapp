import Banner from "@/app/ui/home/Banner";
import BlogSection from "@/app/ui/home/BlogSection";
import Booking from "@/app/ui/home/Booking";
import Advantages from "@/app/ui/home/Advantages";
import Counter from "@/app/ui/home/Counter";
import Features from "@/app/ui/home/Features";
import Hero from "@/app/ui/home/Hero";
import TestimonialSection from "../ui/home/TestimonialSection";
import ServiceCards from "../ui/home/Servicecards";
import PricingSection from "../ui/home/PricingSection";




export default async function Home() {
  return (
    <main className="z-10 scroll-smooth mx-4 lg:mx-10 mt-20 min-h-screen ">
        <div id="home"><Hero/></div>
        <div className=" mt-0 md:mt-[300px] lg:mt-10 mx-0 lg:mx-10" ><Booking/></div>
        <div id="about"><Features /></div>
        <Banner/>
        <div id="blog"><ServiceCards/></div>
        <div><PricingSection/></div>
        <Counter/>
        <div id="services"><Advantages/></div>
        <div id="testimonials"><TestimonialSection/></div>
      
    </main>
  );
}
