import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST() {
  const keys = await redis.keys("chat-history:*");

  if (keys.length > 0) {
    for (const key of keys) {
      await redis.del(key);
    }
  }

  return NextResponse.json({ message: "All chat history reset successfully" });
}
