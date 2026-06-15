import AddMarkerForm from "@/components/forms/marker/add-marker-form";
import { MarkerPage } from "@/components/marker/marker-page";
import { prisma } from "@/prisma/lib/client";

export default async function AddMarker() {
  const categories = await prisma.category.findMany();

  return (
    <MarkerPage
      title="Add Noise"
      subtitle="You have just dropped down a marker, to save the noise fill out this form.">

      <AddMarkerForm categories={categories} />
    </MarkerPage>
  );
}