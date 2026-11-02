import Link from "next/link";

export default function Beranda() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-bold">Temukan event seru disekolahmu</h1>
      <p className="mt-3 text-slate-600">
        Workshop, lomba, musik, dan bazar. Pesan tikenya disini.
      </p>
      <Link
        href="/events"
        className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700"
      >
        Lihat semua event
      </Link>
    </section>
  )
}