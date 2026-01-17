"use client"

import { useEffect, useRef } from "react"

export default function MeshGradientBackground() {
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

    if (canvas.width === 0 || canvas.height === 0) {
      return
    }

    const colors = [
      { r: 10, g: 10, b: 30 },
      { r: 20, g: 20, b: 50 },
      { r: 30, g: 10, b: 50 },
      { r: 10, g: 30, b: 60 },
    ]

    let time = 0
    let animationId: number

    const animate = () => {
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        return
      }

      time += 0.001

      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5,
      )

      colors.forEach((color, i) => {
        const offset = i / (colors.length - 1)
        gradient.addColorStop(
          offset,
          `rgb(${color.r + Math.sin(time + i) * 10}, ${color.g + Math.cos(time + i) * 10}, ${color.b + Math.sin(time + i) * 15})`,
        )
      })

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 10 - 5
          data[i] += noise
          data[i + 1] += noise
          data[i + 2] += noise
        }
        ctx.putImageData(imageData, 0, 0)
      } catch (error) {
        // Silently ignore noise effect errors
      }

      animationId = requestAnimationFrame(animate)
    }

    const timeoutId = setTimeout(animate, 100)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearTimeout(timeoutId)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30"
      aria-hidden="true"
    />
  )
}
