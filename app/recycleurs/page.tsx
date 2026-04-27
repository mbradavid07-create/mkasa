"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
      <span className="text-gray-400 text-sm">Chargement de la carte...</span>
    </div>
  ),
});

const recycleurs = [
  { id: 1, nom: "Kouamé Diabaté", zone: "Cocody", lat: 5.3600, lng: -3.9969, note: 4.9, dispo: ["Lundi", "Jeudi"], verifie: true, tarif: 1500 },
  { id: 2, nom: "Adjoua Bamba", zone: "Yopougon", lat: 5.3364, lng: -4.0742, note: 4.7, dispo: ["Mardi", "Vendredi"], verifie: true, tarif: 1200 },
  { id: 3, nom: "Sékou Traoré", zone: "Abobo", lat: 5.4192, lng: -4.0228, note: 4.5, dispo: ["Mercredi", "Samedi"], verifie: false, tarif: 1000 },
  { id: 4, nom: "Fatou Coulibaly", zone: "Plateau", lat: 5.3197, lng: -4.0166, note: 4.8, dispo: ["Lundi", "Mercredi", "Vendredi"], verifie: true, tarif: 1500 },
];

export default function Recycleurs() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => {
          setErreur("Localisation refusée — carte centrée sur Abidjan");
          setPosition([5.3600, -4.0083]);
        }
      );
    } else {
      setPosition([5.3600, -4.0083]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <a href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600">← Tableau de bord</a>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-900">Trouver un recycleur</span>
        </div>

        {erreur && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
            ⚠️ {erreur}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-gray-900">Recycleurs disponibles</h2>
            {recycleurs.map(r => (
              <div
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${selected === r.id ? "border-green-600" : "border-gray-100"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium text-sm">
                    {r.nom.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-900">{r.nom}</span>
                      {r.verifie && <span className="text-green-600 text-xs">✅</span>}
                    </div>
                    <div className="text-xs text-gray-400">{r.zone} · {r.note} ★</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {r.dispo.map(j => (
                    <span key={j} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{j}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{r.tarif} FCFA / collecte</span>
                  <a href="/planifier" className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg">Réserver</a>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden" style={{height: "600px"}}>
            {position && (
              <MapComponent
                position={position}
                recycleurs={recycleurs}
                selected={selected}
                onSelect={setSelected}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
