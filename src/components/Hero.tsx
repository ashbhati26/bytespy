"use client";

import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import CircularText from "./CircularText";
import { Clipboard, Check } from "lucide-react";
import { useState } from "react";

function LandingPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = "Make a Copy";

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        window.isSecureContext
      ) {
        // Use modern clipboard API
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers or HTTP
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Hide textarea off-screen
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        textArea.style.left = "-1000px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!success) {
          throw new Error("Fallback copy command failed");
        }
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Failed to copy. Please copy manually.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-4 z-0">
      {/* Wrapper with hover effect */}
      <div className="flex flex-col justify-center items-center w-full h-full relative py-4 gap-8 px-4 overflow-hidden">
        <SpotlightCard
          className="flex flex-col w-full md:h-full h-[150vw] bg-[hsla(0,0%,100%,0.15)] backdrop-blur-[0.75em] 
        [-webkit-backdrop-filter:blur(0.75em)] shadow-[inset_0_0_0_0.1em_hsla(0,0%,100%,0.3)]"
          spotlightColor="rgba(251, 250, 246, 0.2)"
        >
          <div className="flex flex-col">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-barlow-condensed uppercase md:tracking-[-6px] scale-y-[1.1] font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              INJECT CHAT
            </motion.h1>
            <div className="flex gap-4">
              <motion.h1
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-barlow-condensed uppercase md:tracking-[-6px] scale-y-[1.1] font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                INTO THE{" "}
              </motion.h1>
              <motion.span
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl text-[#ede1d1] md:text-8xl font-dancing"
              >
                digital
              </motion.span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: -70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-barlow-condensed uppercase md:tracking-[-6px] scale-y-[1.1] font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              FABRIC
            </motion.h1>
          </div>

          <div className="flex flex-col justify-center mt-8 sm:mt-10 md:mt-14">
            <motion.div
              layout
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center w-fit gap-2 py-2 px-8 text-[#0c3c26] hover:bg-[#f0e1cf] bg-[#f6eadc] rounded-md shadow-md text-center"
            >
              <h3 className="text-base uppercase text-center text-[#0c3c26]">
                Copy the URL to your clipboard
              </h3>
              <button
                onClick={handleCopy}
                className="flex justify-center items-center gap-2"
              >
                {copied ? (
                  <Check className="size-4 text-green-400" />
                ) : (
                  <Clipboard className="size-4" />
                )}
                <span className="text-base">{copied ? "Cloned" : "Clone"}</span>
              </button>
            </motion.div>
          </div>

          <CircularText
            text="Connect*Beyond*Browsing*"
            onHover="speedUp"
            spinDuration={20}
            className="flex absolute bottom-2 right-2 sm:bottom-4 sm:right-4"
          />
        </SpotlightCard>
      </div>
    </div>
  );
}

export default LandingPage;
