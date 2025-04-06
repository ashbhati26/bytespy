import { motion } from "framer-motion";
import GlassIcons from "./GlassIcons";
import { TiMessages } from "react-icons/ti";

const Welcome = () => {
  return (
    <div className="flex h-screen items-center justify-center px-4 sm:px-6 py-4">
      <motion.div
        key="welcome"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center gap-3 py-4"
      >
        <GlassIcons icon={<TiMessages />} color="#0c3c26" />
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 font-winky">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-barlow-condensed uppercase md:tracking-[-6px] scale-y-[1.1] font-semibold">
              Hello! I'm Pi,
            </h1>
            <span className="text-4xl sm:text-5xl md:text-6xl font-dancing">and</span>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-barlow-condensed uppercase tracking-[-1px] scale-y-[1.1]">
            I'm here to provide you with instant support.
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl font-barlow-condensed uppercase tracking-[-1px] scale-y-[1.1]">
            What can I help you discover?
          </h2>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
