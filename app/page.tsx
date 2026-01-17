import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import About from "@/components/about"
import Services from "@/components/services"
import Works from "@/components/works"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SEOEnhancer from "@/components/seo-enhancer"
import ParallaxSection from "@/components/parallax-section"
import Pricing from "@/components/pricing" // Added import for Pricing component

export default function Home() {
  return (
    <>
      <SEOEnhancer />
      <Header />
      <main>
        <HeroSlider />
        <ParallaxSection speed={0.3}>
          <About />
        </ParallaxSection>
        <ParallaxSection speed={0.4}>
          <Services />
        </ParallaxSection>
        <ParallaxSection speed={0.35}>
          <Pricing />
        </ParallaxSection>
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
