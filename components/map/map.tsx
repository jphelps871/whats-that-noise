"use client";

import dynamic from "next/dynamic";

const MapMain = dynamic(() => import("./map-main"),
  { ssr: false }
);

export function Map() {
  return <MapMain />;
}