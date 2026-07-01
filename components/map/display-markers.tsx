
import { fetcher } from "@/lib/utils";
import L from "leaflet";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
import useSWR from 'swr';
import { Category, Noise } from "@prisma/client";
import debounce from 'debounce';

type Bounds = {
  north: number
  east: number
  south: number
  west: number
};

type NoiseWithCategory = Omit<Noise, "categoryId"> & {
  category: Category
}

export function createCategoryIcon(category: Category, description: string) {
  return L.divIcon({
    className: "category-marker", // see global.css
    html: `<div data-description="${description}" class="category-marker-dot" style="background-color: ${category.colour}" title="${category.name}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9], // center anchor as it's a circle not pin
    popupAnchor: [0, -9],
  });
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

  const url = `/api/noise?n=${bounds.north}&s=${bounds.south}&e=${bounds.east}&w=${bounds.west}`

  const { data, error, isLoading } = useSWR(url, fetcher);

  useMapEvents({
    moveend() {
      debounce(() => {
        setBounds(getBoundsQuadrant(map.getBounds()));
      }, 500)();
    }
  })

  if (isLoading) return null;
  if (error) return <div>Failed to load</div>;

  if (!data) return null

  return (
    <>
      {data.map((noise: NoiseWithCategory) => (
        <Marker data-description={noise.description} key={noise.id} icon={createCategoryIcon(noise.category, noise.description)} position={[noise.lat, noise.lng]}>
          <Popup>{noise.description}</Popup>
        </Marker>
      ))}
    </>
  )
}