"use client";
import { useEffect, useState } from "react";

export default function TombolFavorit({ id }: { id:number }) {
    const [favorit, setFavorit] = useState(false);

    useEffect(() => {
        const simpan: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorit(simpan.includes(id));
    }, [id]);

    function ubah() {
        const simpan: number[]
    }
}