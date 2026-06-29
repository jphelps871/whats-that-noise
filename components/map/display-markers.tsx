
import { fetcher } from "@/lib/utils";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import useSWR from 'swr';
import { Noise } from "@prisma/client";

const customIcon = L.icon({
  iconUrl: "/marker-icon.png",

  iconSize: [40, 40], // width, height
  iconAnchor: [20, 40],
  popupAnchor: [0, -65],
});

export function DisplayMarkers() {
  const { data, error, isLoading } = useSWR('/api/noise', fetcher);

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