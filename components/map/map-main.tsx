"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";

function GetLatLng() {
  const router = useRouter();

  useMapEvent('dblclick', (e) => {
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
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw" }}
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