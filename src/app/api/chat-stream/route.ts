// app/api/chat-stream/route.ts

import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant" | string;
  content: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId }: { messages: ChatMessage[]; sessionId: string } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content;

    if (!lastMessage || typeof lastMessage !== "string") {
      return NextResponse.json({ error: "Last message is missing or invalid" }, { status: 400 });
    }

    const response = await ragChat.chat(lastMessage, {
      streaming: true,
      sessionId,
    });

    // This will handle response streaming in the proper format
    return aiUseChatAdapter(response);
  } catch (error) {
    console.error("Error in rag-chat route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
