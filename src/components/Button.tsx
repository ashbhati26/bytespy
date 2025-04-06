"use client";

import { FC } from "react";
import { stagger, useAnimate } from "framer-motion";

interface ButtonProps {
  name: string;
  textColor?: string;
  bgColor?: string;
}

const Button: FC<ButtonProps> = ({
  name,
  textColor = "#1c1d20",
  bgColor = "#1c1d20",
}) => {
  const [scope, animate] = useAnimate();

  const onMouseEnter = () => {
    animate(".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) });
    animate(".duplicate", { y: -32 }, { duration: 0.2, delay: stagger(0.05) });
  };

  const onMouseLeave = () => {
    animate(".letter", { y: 0 }, { duration: 0.2, delay: stagger(0.05) });
    animate(".duplicate", { y: 0 }, { duration: 0.2, delay: stagger(0.05) });
  };

  return (
    <div ref={scope} className="flex justify-center items-center font-[Playfair]">
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="rounded-lg px-2 md:px-4 py-[1px] md:font-semibold md:text-lg text-md"
        style={{ color: textColor, backgroundColor: bgColor }}
      >
        <span className="sr-only">{name}</span>
        <span
          className="h-8 overflow-hidden flex items-center justify-center"
          aria-hidden="true"
        >
          {name.split("").map((letter, index) => (
            <span
              className="letter-wrapper relative h-8 flex items-center justify-center"
              key={`${letter}-${index}`}
            >
              <span className="letter">
                {letter === " " ? "\u00A0" : letter}
              </span>
              <span className="absolute left-0 top-full w-full h-full flex items-center justify-center duplicate">
                {letter === " " ? "\u00A0" : letter}
              </span>
            </span>
          ))}
        </span>
      </button>
    </div>
  );
};

export default Button;
