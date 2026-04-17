import { MapButtonToggles } from "@/components/map/ui/map-button-toggles";
import Filters from "@/components/map/ui/filters";

export default function FiltersPage() {
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
