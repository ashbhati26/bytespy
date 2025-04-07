// src/app/[...url]/page.tsx

import { ChatWrapper } from "@/components/ChatWrapper";
import { PageProps } from "@/lib/page.props";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";


export const dynamic = "force-dynamic";

// Helper to decode and join the URL segments
function reconstructUrl(url: string[]): string {
  return url.map(decodeURIComponent).join("/");
}

const Page = async ({ params }: PageProps) => {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("sessionId")?.value || "";

  const urlArray = params.url ?? [];
  const reconstructedUrl = reconstructUrl(urlArray);
  const sessionId = `${reconstructedUrl}--${sessionCookie}`.replace(/\//g, "");

  console.log("🧠 Reconstructed URL:", reconstructedUrl);
  console.log("🔐 Session ID:", sessionId);

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

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

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
