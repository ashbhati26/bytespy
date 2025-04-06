"use client";

import { IoMdSend } from "react-icons/io";
import { type useChat } from "ai/react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
}

export const ChatInput = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
}: ChatInputProps) => {
  const [showSend, setShowSend] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto"; // Reset height to shrink if needed
    target.style.height = `${target.scrollHeight}px`; // Grow dynamically

    // Check if the input is expanded (more than 40px height)
    setIsExpanded(target.scrollHeight > 40);
  };

  return (
    <motion.div
      key="chat-input"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 w-full bg-[#faf3e9] font-[Playfair] p-3 sm:p-4 z-50"
    >
      <div className="flex justify-center w-full">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ borderRadius: "50px" }}
          animate={{ borderRadius: isExpanded ? "12px" : "50px" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center w-full max-w-lg md:max-w-2xl lg:max-w-3xl border bg-[#fbfaf6] border-[#f3e9bd] px-3 sm:px-4 py-2"
        >
          <textarea
            ref={textareaRef}
            autoFocus
            onChange={(e) => {
              handleInputChange(e);
              setShowSend(e.target.value.trim().length > 0);
              handleInput(e);
            }}
            value={input}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
                setInput("");
                setShowSend(false);
                setIsExpanded(false);
              }
            }}
            placeholder="Chat with AI..."
            className="w-full max-h-[200px] overflow-hidden border-none text-base md:text-lg focus:ring-0 
              focus:outline-none resize-none transition-all duration-300 ease-in-out bg-transparent"
          />

          {/* Send Icon */}
          <motion.button
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSend ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-2 text-lg md:text-xl text-[#0c3c26] text-center"
          >
            <IoMdSend />
          </motion.button>
        </motion.form>
      </div>

      <div className="flex justify-center text-center text-xs md:text-sm text-[#0c3c26] mt-2">
        <h2>{`AI may make mistakes, please don't rely on its information.`}</h2>
      </div>
    </motion.div>
  );
};
