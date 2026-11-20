import { Event } from "@/data/events";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Pesanan } from "@/data/pesanan";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase.from("events").select("*").order("tanggal");
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}

export async function ambilEvent(id: number): Promise<Event | null> {
  // Isi URL bisa apa saja (misalnya /event/abc). Periksa dulu sebelum bertanya ke database.
  if (!Number.isInteger(id)) return null;
  const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event | null;
}

// Menghitung total tiket yang dipesan berdasarkan kolom jumlah
export async function totalTiketDipesan(eventId: number): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);
    
  if (error) throw new Error("Gagal menghitung total tiket: " + error.message);
  
  // Menjumlahkan semua nilai dari kolom jumlah menggunakan .reduce()
  return data.reduce((total, item) => total + (item.jumlah ?? 0), 0);
}

export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id)
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event terkait: " + error.message);
  return data as Event[];
}

// Pesanan berisi nama dan email orang, jadi dibaca memakai kunci rahasia (hanya di server).
export async function hitungPesanan(eventId: number): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("pesanan")
    .select("*", { count: "exact", head: true })
    .eq("event_id", eventId);
  if (error) throw new Error("Gagal menghitung pesanan: " + error.message);
  return count ?? 0;
}

export async function ambilPesanan(): Promise<Pesanan[]> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false});
  if (error) throw new Error("Gagal memuat pesanan: " + error.message);
  return data as Pesanan[];
}