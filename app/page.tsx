import { Filters } from "@/components/map/ui/filters";
import { TopNav } from "@/components/layout/top-nav";

export default function Home() {
  return (
    <>
      <div className="pointer-events-auto inline">
        <TopNav />
      </div>

      <div className="mt-2">
        <Filters />
      </div>
    </>
  );
}
