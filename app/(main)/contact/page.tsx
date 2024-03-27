import { ContactForm } from "@/app/ui/Contact/ContactForm";
import { Metadata } from "next";
import { IoIosCall } from "react-icons/io";
import { IoLocation, IoMail } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Contact Page | SDM E-mobility Service",
  description: "Call us to get in touch with us",
};

const ContactPage = () => {
  return (
    <section className="w-full bg-white dark:bg-gray-950 relative min-h-max ">
        
      <div className="w-full min-h-screen my-20 space-y-20 lg:grid lg:grid-cols-2 ">
        <div className="flex flex-col m-auto justify-center  w-[80%] gap-3">
          {/* <h1 className="text-xl font-medium">Contact Us</h1> */}
          <h2 className="text-4xl font-semibold text-emerald-500">
            Get In Touch
          </h2>
          <p className="text-sm ">Have a question? Get in touch with us.</p>
          <div className="flex gap-3 items-center h-20 ">
            <IoLocation className=" bg-emerald-400 text-white  text-[60px] rounded-xl p-3 w-20 " />
            <div>
              <h3 className="text-xl font-medium ">Location</h3>
              <p className="text-sm">
                2nd Floor, 4, 1st Cross Rd, 2nd Phase, Gokula 1st Stage,
                Mathikere, Bengaluru, Karnataka 560054.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center h-20">
            <IoIosCall className=" bg-emerald-400 text-white  text-[55px] rounded-xl p-3 " />
            <div>
              <h3 className="text-xl font-medium ">Phone Number</h3>
              <p className="text-sm">+91 9900992290</p>
            </div>
          </div>
          <div className="flex gap-3 items-center h-20">
            <IoMail className=" bg-emerald-400 text-white  text-[55px] rounded-xl p-3 " />
            <div>
              <h3 className="text-xl font-medium ">Email</h3>
              <p className="text-sm">info@sdm-emobility.com</p>
            </div>
          </div>
        </div>
        <div className="m-auto h-full">
            <ContactForm/>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
