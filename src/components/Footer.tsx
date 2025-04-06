"use client";

import React from "react";
import Eyes from "./Eyes";

const Footer = () => {
  return (
    <div className="bg-[#faf3e9] w-full rounded-t-2xl flex flex-col text-[#0c3c26] z-10">
      <div className="bg-[#ede1d1] h-[20vw] mx-[5vw] rounded-b-2xl items-center justify-between hidden md:flex">
        <div className="left-heading w-[30%] h-full flex flex-col justify-center items-center ml-[5vw] p-4">
          <h1 className="font-barlow-condensed uppercase tracking-[-6px] scale-y-[1.1] font-semibold text-6xl">
            {`Let's Explore`}
          </h1>
        </div>
        <p className="h-[80%] border-[1px] border-[#0c3c26]"></p>
        <div className="eyes w-[70%] h-full">
          <Eyes />
        </div>
      </div>
      <div className="lower-part flex items-center justify-between px-[5vw] py-8">
        <div className="flex flex-col items-start gap-2">
          <p className="text-xl md:text-2xl text-gray-500">Get in touch</p>
          <a
            href="#"
            className='text-lg md:text-xl relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#0c3c26] after:transition-all after:duration-300 hover:after:w-full'
          >
            {`ashbhati26@gmail.com`}
          </a>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-xl md:text-2xl text-gray-500">Connect</p>
          <a
            href="https://www.linkedin.com/in/ashbhati26/"
            className='text-lg md:text-xl relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#0c3c26] after:transition-all after:duration-300 hover:after:w-full'
          >
            LinkedIn
          </a>
          <a
            href="#"
            className='text-lg md:text-xl relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#0c3c26] after:transition-all after:duration-300 hover:after:w-full'
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="copyright w-full text-center text-base p-4">
        {`© 2025 Ashish. All rights reserved.`}
      </div>
    </div>
  );
};

export default Footer;
