"use client";

import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";

function GetLatLng() {
  const router = useRouter();

  useMapEvent('click', (e) => {
    router.push(`/marker/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  })
  return null
}

export default function MapInner() {
  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        zoomSnap={0}
        zoomDelta={1}
        zoomControl={false}
        wheelPxPerZoomLevel={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetLatLng />
      </MapContainer>
    </div>
  );
}