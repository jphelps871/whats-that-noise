import { DialogTitle, DialogDescription, DialogContent } from "../ui/dialog"
import DialogWithRouterAsClose from "../ui/dialog-with-router-as-close"

type MarkerPageProps = {
  title: string,
  subtitle: string
  children: React.ReactNode
}

export function MarkerPage({ title, subtitle, children }: MarkerPageProps) {
  return (
    <DialogWithRouterAsClose defaultOpen>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{subtitle}</DialogDescription>

        {children}
      </DialogContent>
    </DialogWithRouterAsClose>
  )
}