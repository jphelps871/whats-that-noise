import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <Card className="w-full max-w-sm pointer-events-auto">
      <CardContent>
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">Search</FieldLabel>
          <Input id="search" type="search" placeholder="Buckingham Palace" />
          <FieldDescription>
            Search anywhere to see noise levels, select filters below using the drop-down.
          </FieldDescription>
        </Field>
      </CardContent>
    </Card>
  )
}
