"use client";
import React, { useEffect, useState } from "react";

function Eyes() {
  const [angle, setAngle] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      const theta = Math.atan2(deltaY, deltaX); // Angle for pupil
      setAngle(theta);

      // Move black ball slightly towards cursor (like before)
      const maxOffset = 15;
      setOffsetX(Math.max(Math.min(deltaX / 30, maxOffset), -maxOffset));
      setOffsetY(Math.max(Math.min(deltaY / 30, maxOffset), -maxOffset));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const Eye = () => {
    const radius = 32; // How far the white dot travels inside the black circle
    const pupilX = radius * Math.cos(angle);
    const pupilY = radius * Math.sin(angle);

    return (
      <div className="w-[13vw] h-[13vw] flex items-center justify-center rounded-full bg-zinc-100 overflow-hidden">
        <div
          style={{
            transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="relative w-3/5 h-3/5 rounded-full bg-zinc-900"
        >
          <div
            style={{
              transform: `translate(${pupilX}px, ${pupilY}px)`,
              transition: "transform 0.1s ease-out",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-5 h-5 rounded-full bg-zinc-100"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="eyes w-full h-full overflow-hidden">
      <div
        data-scroll
        data-section
        data-scroll-speed="-.4"
        className="relative w-full h-full bg-cover bg-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex gap-10">
          <Eye />
          <Eye />
        </div>
      </div>
    </div>
  );
}

export default Eyes;
