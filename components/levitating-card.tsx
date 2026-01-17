"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface LevitatingCardProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  layoutId?: string
}

export function LevitatingCard({ children, className = "", href, onClick, layoutId }: LevitatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 30, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 30, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.05,
        z: 50,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
