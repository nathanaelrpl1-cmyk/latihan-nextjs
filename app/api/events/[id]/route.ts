import { NextResponse } from "next/server";
import { ambilEvent } from "@/data/ambil";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const { id } = await context.params;
  const eventId = Number(id);
  
  // Memanggil fungsi ambilEvent dari @/data/ambil untuk query ke Supabase
  const event = await ambilEvent(eventId);

  if (!event) {
    return NextResponse.json({ pesan: "Event tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(event);
}