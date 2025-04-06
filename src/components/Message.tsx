import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clipboard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

const Message = ({ content, isUserMessage }: MessageProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="md:p-4 py-2 px-4 flex justify-center font-[Playfair] text-base md:text-xl">
      <div className="max-w-2xl w-full flex flex-col gap-1">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex flex-col px-4 max-w-md relative",
              isUserMessage ? "bg-[#f6eadc] rounded-lg ml-auto" : "mr-auto"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p className="py-1 whitespace-pre-wrap break-words">{content}</p>

            {!isUserMessage && (
              <div className="flex justify-start px-2 absolute -bottom-5.5">
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center gap-1 py-1 px-2 text-[#0c3c26] hover:bg-[#f0e1cf] bg-[#f6eadc] rounded-md shadow-md"
                    >
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2"
                      >
                        {copied ? (
                          <Check className="size-4 text-green-400" />
                        ) : (
                          <Clipboard className="size-4" />
                        )}
                        <span className="text-base">
                          {copied ? "Cloned" : "Clone"}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
