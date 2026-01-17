"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  children: string | string[]
  className?: string
  delay?: number
  staggerDelay?: number
}

export function AnimatedText({ children, className = "", delay = 0, staggerDelay = 0.03 }: AnimatedTextProps) {
  const text = Array.isArray(children) ? children.join("") : children
  const characters = text.split("")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      filter: "blur(20px) brightness(1.5)",
      scale: 0.3,
      x: () => Math.random() * 100 - 50,
      y: () => Math.random() * 100 - 50,
      rotate: () => Math.random() * 360,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        filter: {
          duration: 1.4,
        },
      },
    },
  }

  const float = {
    y: [0, -3, 0],
    filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
      delay: delay + characters.length * staggerDelay + 0.8,
    },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block" }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={child}
          animate={float}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            transformOrigin: "center center",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface AnimatedLinesProps {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
}

export function AnimatedLines({ lines, className = "", lineClassName = "", delay = 0 }: AnimatedLinesProps) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={index} className={lineClassName}>
          <AnimatedText delay={delay + index * 0.3} staggerDelay={0.02}>
            {line}
          </AnimatedText>
        </div>
      ))}
    </div>
  )
}
