"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
        wheelPxPerZoomLevel={3}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[51.505, -0.09]}>
          <Popup>Hello 👋</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}