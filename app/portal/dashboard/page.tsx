import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsSite } from "@/types/microcms"
import DashboardClient from "./dashboard-client"

export default async function PortalDashboardPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !user.email) {
    redirect("/portal/login")
  }

  const admin = createSupabaseAdminClient()
  const { data: customer, error } = await admin
    .from("customers")
    .select("subscriptionStatus, planId, tenantId, updatedAt")
    .eq("email", user.email)
    .maybeSingle()

  let sites: MicroCmsSite[] = []
  let microcmsError = false

  try {
    if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
      throw new Error("microCMS env missing")
    }

    const data = await microcmsClient.getList<MicroCmsSite>({
      endpoint: "sites",
      queries: { limit: 3, orders: "-createdAt" },
    })

    sites = data.contents
  } catch (err) {
    console.error("Dashboard microCMS Fetch Error:", err)
    microcmsError = true
  }

  return (
    <DashboardClient
      userEmail={user.email}
      customer={customer ?? null}
      hasError={Boolean(error)}
      sites={sites}
      microcmsError={microcmsError}
    />
  )
}
