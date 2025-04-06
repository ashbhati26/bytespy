"use client";

import { Message, useChat } from "ai/react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Welcome from "./Welcome";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleInputChange, handleSubmit, input, setInput, setMessages } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
    stream: false,
  });

  const [isChatReset, setIsChatReset] = useState(initialMessages.length === 0);

  // ✅ Update reset state when messages change
  useEffect(() => {
    if (messages.length === 0 && !isChatReset) {
      setIsChatReset(true);
    }
  }, [messages, isChatReset]);

  // ✅ Clear Redis data on exit
  useEffect(() => {
    const handleUnload = () => {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/cleanup",
          new Blob([JSON.stringify({ sessionId })], { type: "application/json" })
        );
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [sessionId]);

  const handleResetChat = async () => {
    try {
      const response = await fetch("/api/reset-chat", { method: "POST" });

      if (!response.ok) throw new Error("Failed to reset chat");

      setMessages([]);
      setIsChatReset(true);
    } catch (error) {
      console.error("Reset failed:", error);
      alert("Error resetting chat history.");
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!input.trim()) return;
    setIsChatReset(false);

    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col justify-between bg-[#faf3e9] text-[#0c3c26]">
      <Navbar onResetChat={handleResetChat} />

      <div className="justify-between flex flex-col">
        {isChatReset ? <Welcome /> : <Messages messages={messages} />}
      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSendMessage}
        setInput={setInput}
      />
    </div>
  );
};
