"use client";

import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import { DisplayMarkers } from "./display-markers";

function GetLatLng() {
  const router = useRouter();

  useMapEvent('dblclick', (e) => {
    router.push(`/noise/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
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
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <GetLatLng />
        <DisplayMarkers />
      </MapContainer>
    </div>
  );
}