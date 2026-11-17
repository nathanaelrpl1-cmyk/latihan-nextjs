import Link from "next/link";
import { alamatHalaman, Saringan } from "@/data/saring";

type HalamanProps = {
  s: Saringan;
  hal: number;
  jumlah: number;
};

export default function Halaman({ s, hal, jumlah }: HalamanProps) {
  // 4. Tidak menampilkan apa pun bila hanya ada satu halaman
  if (jumlah <= 1) return null;

  const daftarNomor = Array.from({ length: jumlah }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* 1. Tautan « Sebelumnya (tidak tampil di halaman 1) */}
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          « Sebelumnya
        </Link>
      )}

      {/* 2. Tautan nomor 1 sampai jumlah */}
      {daftarNomor.map((n) => {
        const aktif = n === hal;
        return (
          <Link
            key={n}
            href={alamatHalaman(s, n)}
            className={`rounded border px-3 py-1.5 text-sm font-medium ${
              aktif
                ? "bg-blue-600 text-white border-blue-600"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            {n}
          </Link>
        );
      })}

      {/* 3. Tautan Berikutnya » (tidak tampil di halaman terakhir) */}
      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Berikutnya »
        </Link>
      )}
    </div>
  );
}