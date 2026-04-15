import { MapButtonToggles } from "@/components/layouts/map-button-toggles";
import Filters from "@/components/map/filters";

export default function Search() {

  return (
    <>
      <div className="pointer-events-auto inline">
        <MapButtonToggles />
      </div>

      <div className="mt-2">
        <Filters />
      </div>
    </>
  )
}
