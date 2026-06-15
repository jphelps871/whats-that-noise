import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

function TestSessionWrapper({
  children,
  session,
}: {
  children: ReactNode;
  session?: any;
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

export { TestSessionWrapper }