"use client";
import { useState } from "react";
import type { Event } from "@/data/event";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
    const [cari, setCari] = useState("");
    const [kategori, setKategori] = useState("Semua");
    const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);

    const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
    const hasil = events.filter(
        (e) => {
            const sisa = e.kuota - e.terisi;
            const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
            const cocokKategori = kategori === "Semua" || e.kategori === kategori;
            const cocokTiket = !hanyaAdaTiket || sisa > 0;
            return cocokCari && cocokKategori && cocokTiket;
        }
    );
    return (
        <div>
            <div className="mt-4 flex flex-wrap gap-3">
                <input
                    value={cari}
                    onChange={(e) => setCari(e.target.value)}
                    placeholder="Cari event..."
                    className="rounded border bg-white px-3 py-2"
                />
                <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="rounded border bg-white px-3 py-2"
                >
                    {daftarKategori.map((k) => (
                        <option key={k}>{k}</option>
                    ))}
                </select>
                
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="filterTiket"
                        checked={hanyaAdaTiket}
                        onChange={(e) => setHanyaAdaTiket(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="filterTiket" className="text-sm font-medium text-slate-700">
                        Hanya yang masih ada tiket
                    </label>
                </div>
            </div>
            {hasil.length === 0 ? (
                <p className="text-slate-500">Tidak ada event yang cocok.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {hasil.map((e) => (
                        <KartuEvent key={e.id} event={e} />
                    ))}
                </div>
            )}
        </div>
    );
}