import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST() {
  try {
    const keys = await redis.keys("chat-history:*");

    if (keys.length > 0) {
      for (const key of keys) {
        await redis.del(key);
      }
    }

    return NextResponse.json({ message: "All chat history reset successfully" });
  } catch (err) {
    console.error("Error resetting chat history:", err);
    return NextResponse.json({ error: "Failed to reset chat history" }, { status: 500 });
  }
}
