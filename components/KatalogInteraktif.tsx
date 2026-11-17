// "use client";
// import { useState, useEffect } from "react";
// import { rupiah, type Event } from "@/data/event";
// import KartuEvent from "./KartuEvent";
// import KontrolKatalog from "./KontrolKatalog";

// export default function KatalogInteraktif({ events }: { events: Event[] }) {
//   const [cari, setCari] = useState("");
//   const [kategori, setKategori] = useState("Semua");
//   const [urut, setUrut] = useState("tanggal");
//   const [jumlahTampil, setJumlahTampil] = useState(4);
//   const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);
//   const [hargaMaksimal, setHargaMaksimal] = useState("");

//   useEffect(() => {
//     const savedUrut = localStorage.getItem("urut");
//     if (savedUrut) {
//       setUrut(savedUrut);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("urut", urut);
//   }, [urut]);

//   const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

//   const hasil = events.filter((e) => {
//     const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
//     const cocokKategori = kategori === "Semua" || e.kategori === kategori;
//     const sisa = e.kuota - e.terisi;
//     const cocokTiket = !hanyaAdaTiket || sisa > 0;
//     const cocokHarga = hargaMaksimal === "" || e.harga <= Number(hargaMaksimal);

//     return cocokCari && cocokKategori && cocokTiket && cocokHarga;
//   });

//   const rataRataHarga =
//     hasil.length === 0
//       ? "—"
//       : rupiah(hasil.reduce((total, e) => total + e.harga, 0) / hasil.length);

//   const totalSisaTiket = hasil.reduce(
//     (total, e) => total + e.kuota - e.terisi,
//     0,
//   );

//   const tersusun = [...hasil].sort((a, b) => {
//     if (urut === "murah") return a.harga - b.harga;
//     if (urut === "mahal") return b.harga - a.harga;
//     if (urut === "nama") return a.judul.localeCompare(b.judul);
//     return a.tanggal.localeCompare(b.tanggal);
//   });

//   return (
//     <div>
//       <KontrolKatalog
//         cari={cari}
//         setCari={setCari}
//         kategori={kategori}
//         setKategori={setKategori}
//         daftarKategori={daftarKategori}
//         urut={urut}
//         setUrut={setUrut}
//         hanyaAdaTiket={hanyaAdaTiket}
//         setHanyaAdaTiket={setHanyaAdaTiket}
//         hargaMaksimal={hargaMaksimal}
//         setHargaMaksimal={setHargaMaksimal}
//         setJumlahTampil={setJumlahTampil}
//       />

//       <p className="mb-3 mt-4 text-sm text-slate-500">
//         {tersusun.length} event ditemukan
//       </p>
//       <p className="mb-3 text-sm text-slate-500">
//         Rata-rata harga: {rataRataHarga} · Total sisa tiket: {totalSisaTiket}
//       </p>
//       {tersusun.length === 0 ? (
//         <p className="text-slate-500">Tidak ada event yang cocok.</p>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {tersusun.slice(0, jumlahTampil).map((e) => (
//             <KartuEvent key={e.id} event={e} />
//           ))}
//         </div>
//       )}
//       {tersusun.length > jumlahTampil && (
//         <button
//           type="button"
//           onClick={() => setJumlahTampil((jumlah) => jumlah + 4)}
//           className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//         >
//           Tampilkan lagi
//         </button>
//       )}
//     </div>
//   );
// }