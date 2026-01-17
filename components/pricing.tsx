"use client"

import { motion, useInView } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { useRef } from "react"
import { AnimatedText } from "./animated-text"
import { useLanguage } from "@/contexts/language-context"

export default function Pricing() {
  const { language, translations } = useLanguage()
  const pricingData = translations[language].pricing

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 })
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-32 md:py-40 relative bg-gradient-to-b from-gray-50 to-white mb-24"
      style={{ isolation: "isolate" }}
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none grain-texture" />

      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent inline-block">
              {isHeadingInView && (
                <AnimatedText delay={0} staggerDelay={0.05}>
                  {pricingData.heading}
                </AnimatedText>
              )}
              {!isHeadingInView && pricingData.heading}
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-light">{pricingData.subheading}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingData.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -12,
                rotateX: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`relative group ${plan.recommended ? "md:-mt-4 md:mb-4" : ""}`}
              style={{ perspective: "1000px" }}
            >
              {/* Recommended badge */}
              {plan.recommended && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    {pricingData.recommended}
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <div
                className={`relative h-full rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 ${
                  plan.recommended
                    ? "bg-white/90 shadow-2xl border-2 border-blue-500/20"
                    : "bg-white/60 shadow-xl border border-gray-200/50"
                }`}
                style={{
                  transform: "translateZ(0)",
                }}
              >
                {/* Glowing border animation for recommended plan */}
                {plan.recommended && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.3))",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-500/5 to-indigo-500/5 pointer-events-none" />
                  </>
                )}

                {/* Inner glow on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{plan.description}</p>
                  <p className="text-xs text-gray-500 mb-6 min-h-[2.5rem]">{plan.target}</p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.2 + 0.1 * idx }}
                        className="flex items-start gap-3"
                      >
                        <Check
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            plan.recommended ? "text-blue-600" : "text-gray-600"
                          }`}
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.recommended
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {translations[language].contact.heading}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-sm">
            {language === "ja"
              ? "※料金は目安です。プロジェクトの規模や要件により変動いたします。お気軽にご相談ください。"
              : "* Prices are estimates. Costs may vary depending on project scope and requirements. Feel free to contact us."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
