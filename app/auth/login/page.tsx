"use client";

import PageWrapper from "@/components/ui/page-wrapper"
import { Typography } from "@/components/ui/Typography"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { SiGithub, SiGoogle, SiFacebook, SiApple } from "@icons-pack/react-simple-icons";
import Link from "next/link"

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

export default function Login() {
  return (
    <PageWrapper>
      <div className="flex justify-center items-center h-full">
        <div className="space-y-4 w-full">
          <Typography variant="h2">Login</Typography>

          <Typography variant="p">You must be logged in to add a marker.</Typography>

          <div className="flex flex-col space-y-2">
            {providers.map(({ id, label, icon: Icon, className }) => (
              <Button
                key={id}
                className={className}
                onClick={() => signIn(id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                Continue with {label}
              </Button>
            ))}
            <Button variant="destructive" className="mt-6" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}