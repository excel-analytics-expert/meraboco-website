import type { Metadata } from "next"
import Header from "@/components/header"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "メラボコへのお問い合わせはこちらから。",
  openGraph: {
    title: "お問い合わせ | メラボコ",
    description: "メラボコへのお問い合わせはこちらから。",
    url: "https://meraboco.jp/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-24">
        <Contact />
      </main>
      <Footer />
    </>
  )
}
