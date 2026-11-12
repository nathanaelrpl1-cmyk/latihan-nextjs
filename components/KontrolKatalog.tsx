"use client";

type KontrolKatalogProps = {
  cari: string;
  setCari: (val: string) => void;
  kategori: string;
  setKategori: (val: string) => void;
  daftarKategori: string[];
  urut: string;
  setUrut: (val: string) => void;
  hanyaAdaTiket: boolean;
  setHanyaAdaTiket: (val: boolean) => void;
  hargaMaksimal: string;
  setHargaMaksimal: (val: string) => void;
  setJumlahTampil: (val: number | ((prev: number) => number)) => void;
};

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  daftarKategori,
  urut,
  setUrut,
  hanyaAdaTiket,
  setHanyaAdaTiket,
  hargaMaksimal,
  setHargaMaksimal,
  setJumlahTampil,
}: KontrolKatalogProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <input
        value={cari}
        onChange={(e) => {
          setCari(e.target.value);
          setJumlahTampil(4);
        }}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />
      <select
        value={kategori}
        onChange={(e) => {
          setKategori(e.target.value);
          setJumlahTampil(4);
        }}
        className="rounded border bg-white px-3 py-2"
      >
        {daftarKategori.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <select
        value={urut}
        onChange={(e) => {
          setUrut(e.target.value);
          setJumlahTampil(4);
        }}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={hanyaAdaTiket}
          onChange={(e) => {
            setHanyaAdaTiket(e.target.checked);
            setJumlahTampil(4);
          }}
          className="rounded border"
        />
        <span className="text-sm">Hanya yang masih ada tiket</span>
      </label>

      <input
        type="number"
        value={hargaMaksimal}
        onChange={(e) => {
          setHargaMaksimal(e.target.value);
          setJumlahTampil(4);
        }}
        placeholder="Harga maksimal"
        className="rounded border bg-white px-3 py-2 w-36"
      />
    </div>
  );
}