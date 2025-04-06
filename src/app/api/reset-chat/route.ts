import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST() {
  try {
    const keys = await redis.keys("chat-history:*");

    if (keys.length > 0) {
      // Optional: Delete in chunks if array is large
      for (const key of keys) {
        await redis.del(key);
      }
    }

    return NextResponse.json({ message: "All chat history reset successfully" });
  } catch (_error) {
    console.error("Error resetting chat history:", _error);
    return NextResponse.json({ error: "Failed to reset chat history" }, { status: 500 });
  }
}
