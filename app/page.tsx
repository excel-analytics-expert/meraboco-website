import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import About from "@/components/about"
import Services from "@/components/services"
import Works from "@/components/works"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SEOEnhancer from "@/components/seo-enhancer"
import ParallaxSection from "@/components/parallax-section"
import SmartPlanSection from "@/components/smart-plan-section"
import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsPricingPlan } from "@/types/microcms"

export default async function Home() {
  let plans: MicroCmsPricingPlan[] = []
  let plansError = false

  try {
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
      const data = await microcmsClient.getList<MicroCmsPricingPlan>({
        endpoint: "plans",
        queries: { limit: 3, orders: "createdAt" },
      })
      plans = data.contents
    } else {
      plansError = true
    }
  } catch (err) {
    console.error("Home plans Fetch Error:", err)
    plansError = true
  }

  return (
    <>
      <SEOEnhancer />
      <Header />
      <main>
        <section className="bg-[#FDFCFB]">
          <HeroSlider />
        </section>
        <ParallaxSection speed={0.3}>
          <About />
        </ParallaxSection>
        <ParallaxSection speed={0} enableFade={false}>
          <Services />
        </ParallaxSection>
        <SmartPlanSection plans={plans} hasError={plansError} />
        <ParallaxSection speed={0.3}>
          <Works />
        </ParallaxSection>
        <ParallaxSection speed={0.2}>
          <Contact />
        </ParallaxSection>
      </main>
      <Footer />
    </>
  )
}
