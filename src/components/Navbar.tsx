"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Button from "./Button";

const Navbar = ({ onResetChat }: { onResetChat: () => void }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!navContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [isNavVisible]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className="fixed inset-x-0 bg-[#0c3c26] drop-shadow-xl rounded-lg my-4 mx-[6vw] md:mx-[16vw] z-50"
    >
      <header className="w-full">
        <nav className="flex items-center justify-between px-6 md:py-3 py-2">
          <Link href="/">Logo</Link>
          <div onClick={onResetChat}>
            <Button name="New Session" textColor="#0c3c26" bgColor="#faf3e9" />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
