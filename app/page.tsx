import { Filters } from "@/components/map/ui/filters";
import { TopNav } from "@/components/layout/top-nav";

export default function Home() {
  return (
    <>
      <div className="pointer-events-auto inline">
        <TopNav />
      </div>

      <div className="mt-2">
        {/* 
          Toggled from MapButtonToggles in top-nav.tsx. Using the provider 
          toggle-cards-on-map-provider.tsx 
        */}
        <Filters />
      </div>
    </>
  );
}
