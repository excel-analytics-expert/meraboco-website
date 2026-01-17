"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale"
  delay?: number
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  const animationClasses = {
    "fade-up": "translate-y-20 opacity-0",
    "fade-in": "opacity-0",
    "slide-left": "translate-x-20 opacity-0",
    "slide-right": "-translate-x-20 opacity-0",
    scale: "scale-95 opacity-0",
  }

  const visibleClasses = "translate-y-0 translate-x-0 opacity-100 scale-100"

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? visibleClasses : animationClasses[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
