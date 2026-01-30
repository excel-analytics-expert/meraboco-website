import { redirect } from "next/navigation"
import { sendMagicLink } from "./actions"
import PortalLoginClient from "./portal-login-client"

type PortalLoginPageProps = {
  searchParams?: { plan?: string }
}

export default function PortalLoginPage({ searchParams }: PortalLoginPageProps) {
  if (searchParams?.plan) {
    redirect("/contact")
  }
  return <PortalLoginClient action={sendMagicLink} />
}
