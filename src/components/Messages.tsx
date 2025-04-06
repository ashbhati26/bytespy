import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { type Message as TMessage } from "ai/react";
import Message from "./Message";

interface MessagesProps {
  messages: TMessage[];
}

const Messages = ({ messages }: MessagesProps) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  // Prevent scroll glitch on mobile
  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="flex flex-col overflow-y-auto h-screen px-4 md:px-0">
      <div className="flex flex-col gap-2 md:mt-[6vw] mt-16 flex-grow">
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center text-xl font-semibold text-[#0c3c26]"
          >
            {`Welcome! Ask me anything ✨`}
          </motion.div>
        )}

        {messages.map((message, i) => (
          <Message
            key={i}
            content={message.content}
            isUserMessage={message.role === "user"}
          />
        ))}

        <div className="h-24" ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;
