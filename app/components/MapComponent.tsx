"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const iconVert = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const iconBleu = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function CenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);
  return null;
}

interface Recycleur {
  id: number;
  nom: string;
  zone: string;
  lat: number;
  lng: number;
  note: number;
  dispo: string[];
  verifie: boolean;
  tarif: number;
}

interface Props {
  position: [number, number];
  recycleurs: Recycleur[];
  selected: number | null;
  onSelect: (id: number) => void;
}

export default function MapComponent({ position, recycleurs, selected, onSelect }: Props) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterMap position={position} />

      {/* Position du client */}
      <Marker position={position} icon={iconBleu}>
        <Popup>📍 Votre position</Popup>
      </Marker>
      <Circle center={position} radius={500} color="blue" fillOpacity={0.1} />

      {/* Recycleurs */}
      {recycleurs.map(r => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={iconVert}
          eventHandlers={{ click: () => onSelect(r.id) }}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-medium">{r.nom} {r.verifie ? "✅" : ""}</div>
              <div className="text-gray-500">{r.zone} · {r.note} ★</div>
              <div className="text-green-600">{r.tarif} FCFA / collecte</div>
              <div className="mt-1">{r.dispo.join(", ")}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}