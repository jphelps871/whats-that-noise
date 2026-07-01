import PageWrapper from "@/components/ui/page-wrapper"
import { Typography } from "@/components/ui/Typography"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { SiGithub, SiGoogle, SiFacebook, SiApple } from "@icons-pack/react-simple-icons";
import Link from "next/link"
import React, { Suspense } from "react";
import { AuthError } from "./auth-error";

type AuthPageProps = {
  title: string,
  subtitle: React.ReactNode
  children: React.ReactNode
}

const providers = [
  {
    id: "github",
    label: "GitHub",
    icon: SiGithub,
    className: "bg-[#24292F] text-white",
  },
  // {
  //   id: "facebook",
  //   label: "Facebook",
  //   icon: SiFacebook,
  //   className: "bg-[#1877F2] text-white",
  // },
  // {
  //   id: "apple",
  //   label: "Apple",
  //   icon: SiApple,
  //   className: "bg-black text-white",
  // },
  // {
  //   id: "google",
  //   label: "Google",
  //   icon: SiGoogle,
  //   className: "bg-[#4285F4] text-white",
  // },
];

export function AuthPage({ title, subtitle, children }: AuthPageProps) {
  return (
    <PageWrapper>
      <div className="flex justify-center items-center h-full">
        <div className="space-y-4 w-full">
          <Typography variant="h2">{title}</Typography>

          <Typography variant="p">
            {subtitle}
          </Typography>

          <div className="flex flex-col space-y-2">
            {providers.map(({ id, label, icon: Icon, className }) => (
              <Button
                key={id}
                variant="outline"
                className="border-primary"
                onClick={() => signIn(id, {
                  callbackUrl: "/"
                })}
              >
                <Icon className="mr-2 h-4 w-4" />
                Continue with {label}
              </Button>
            ))}

            <Suspense fallback={null}>
              <AuthError />
            </Suspense>

            {/* Form */}
            {children}

            <Button variant="destructive" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}