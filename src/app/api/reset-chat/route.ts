import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST() {
  try {
    // Get all keys related to chat history
    const keys = await redis.keys("chat-history:*");

    if (keys.length > 0) {
      await redis.del(...keys); // Delete all chat keys
    }

    return NextResponse.json({ message: "All chat history reset successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset chat history" }, { status: 500 });
  }
}
