"use client";

import dynamic from "next/dynamic";

const MapInner = dynamic(() => import("./map-inner"),
  { ssr: false }
);

export function Map() {
  return <MapInner />;
}