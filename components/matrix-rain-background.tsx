"use client"

import { useEffect, useRef } from "react"

export default function MatrixRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const chars = "メラボコmeraboco01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const charArray = chars.split("")
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0fa"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Gradient effect - brighter at the head
        const alpha = Math.random() * 0.5 + 0.3
        ctx.fillStyle = `rgba(0, 255, 170, ${alpha})`
        ctx.fillText(text, x, y)

        // Glow effect for some characters
        if (Math.random() > 0.98) {
          ctx.shadowColor = "#0fa"
          ctx.shadowBlur = 10
          ctx.fillStyle = "#fff"
          ctx.fillText(text, x, y)
          ctx.shadowBlur = 0
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const intervalId = setInterval(draw, 50)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20"
      style={{ zIndex: -5 }}
      aria-hidden="true"
    />
  )
}
