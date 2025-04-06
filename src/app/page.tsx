"use client";

import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Lenis from "@studio-freight/lenis";

const Page = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      autoRaf: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#092e1d] text-[#faf3e9] font-[Playfair]">
      <Hero />
      <Footer />
    </div>
  );
};

export default Page;
