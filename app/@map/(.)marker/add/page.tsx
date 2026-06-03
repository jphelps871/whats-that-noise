import { DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddMarkerForm from "@/components/forms/marker/add-marker-form";
import DialogWithRouterAsClose from "@/components/ui/dialog-with-router-as-close";

export default function AddMarker() {
  return (
    <DialogWithRouterAsClose defaultOpen>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle>Add Noise</DialogTitle>
        <DialogDescription>
          You have just dropped down a marker, to save the noise fill out this form.
        </DialogDescription>

        <AddMarkerForm />
      </DialogContent>
    </DialogWithRouterAsClose>
  );
}