
import { fetcher } from "@/lib/utils";
import L from "leaflet";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
import useSWR from 'swr';
import { Noise } from "@prisma/client";

const customIcon = L.icon({
  iconUrl: "/marker-icon.png",

  iconSize: [40, 40], // width, height
  iconAnchor: [20, 40],
  popupAnchor: [0, -65],
});

type Bounds = {
  north: number
  east: number
  south: number
  west: number
}

const getBoundsQuadrant = (bounds: L.LatLngBounds) => {
  return {
    north: bounds.getNorth(),
    east: bounds.getEast(),
    south: bounds.getSouth(),
    west: bounds.getWest(),
  }
}

export function DisplayMarkers() {
  const map = useMap();
  const [bounds, setBounds] = useState<Bounds>(getBoundsQuadrant(map.getBounds()));

  const url = !bounds ? '/api/noise' : `/api/noise?n=${bounds.north}&s=${bounds.south}&e=${bounds.east}&w=${bounds.west}`

  const { data, error, isLoading } = useSWR(url, fetcher);

  useMapEvents({
    moveend() {
      setBounds(getBoundsQuadrant(map.getBounds()));
    }
  })

  if (isLoading) return null;
  if (error) return <div>Failed to load</div>;

  if (!data) return null


  return (
    <>
      {data.map((noise: Noise) => (
        <Marker key={noise.id} icon={customIcon} position={[noise.lat, noise.lng]}>
          <Popup>{noise.description}</Popup>
        </Marker>
      ))}
    </>
  )
}