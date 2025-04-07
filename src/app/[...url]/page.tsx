// app/[...url]/page.tsx

import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // Ensures the page is always rendered on the server

// Helper to decode and join the URL segments into a proper path string
function reconstructUrl(url: string[]): string {
  return url.map(decodeURIComponent).join("/");
}

const Page = async ({ params }: { params: { url?: string[] } }) => {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("sessionId")?.value || "";

  const urlArray = params.url ?? [];
  const reconstructedUrl = reconstructUrl(urlArray);

  // Construct a unique sessionId by combining the URL with the session cookie
  const sessionId = `${reconstructedUrl}--${sessionCookie}`.replace(/\//g, "");

  console.log("🧠 Reconstructed URL:", reconstructedUrl);
  console.log("🔐 Session ID:", sessionId);

  // Check if the URL has already been indexed in Redis
  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

  // If not indexed, index it using RAG and add it to the Redis set
  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: {
        chunkOverlap: 50,
        chunkSize: 200,
      },
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  // Fetch initial chat history for this session
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
