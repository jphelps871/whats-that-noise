export function InputError({ message }: { message?: string }) {
  return message && <p role="" className="text-destructive text-sm">{message}</p>
}