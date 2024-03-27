import AboutSectionOne from "@/app/ui/About/AboutSectionOne";
import AboutSectionTwo from "@/app/ui/About/AboutSectionTwo";
import HeroSection from "@/app/ui/About/HeroSection";
import Video from "@/app/ui/About/Video";
import Breadcrumb from "@/app/ui/Common/Breadcrumb";
import Banner from "@/app/ui/home/Banner";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Video/>
      <HeroSection/>
      <AboutSectionOne />
      <Banner/>
    </>
  );
};

export default AboutPage;
