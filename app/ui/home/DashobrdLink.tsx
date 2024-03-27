import { checkRole } from "@/utils/roles";
import Link from "next/link";
import React from "react";

const DashobrdLink = () => {
   const admin = checkRole("admin");  

  return (
    <>
      {admin && (
        <div className="fixed  text-[10px]  z-[51] top-0 right-0 w-[100%] lg:w-1/2 text-right mx-5">
          <p>
            Hello welcome Admin, GO to{" "}
            <Link href={"/dashboard"} className="font--semibold text-emerald-400">Dashboard</Link>{" "}Here.
          </p>
        </div>
      )}
    </>
  );
};

export default DashobrdLink;
