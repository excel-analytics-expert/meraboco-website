import type { Metadata } from "next"
import MaintenanceClient from "./maintenance-client"

export const metadata: Metadata = {
  title: "保守・運用",
  description:
    "WEBサイト・システムの定期更新、セキュリティ対策、障害対応、サーバー監視など、安定稼働をトータルサポートします。",
  openGraph: {
    title: "保守・運用 | メラボコ",
    description: "WEBサイト・システムの定期更新、セキュリティ対策、障害対応を行います。",
    url: "https://meraboco.jp/services/maintenance",
  },
}

export default function MaintenancePage() {
  return <MaintenanceClient />
}
