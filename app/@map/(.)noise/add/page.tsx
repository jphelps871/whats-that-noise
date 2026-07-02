import AddNoiseForm from "@/components/forms/noise/add-noise-form";
import { MarkerPage } from "@/components/marker/marker-page";

export const dynamic = 'force-dynamic'

export default async function AddNoise() {
  return (
    <MarkerPage
      title="Add Noise"
      subtitle="You have just dropped down a marker, to save the noise fill out this form.">

      <AddNoiseForm />
    </MarkerPage>
  );
}