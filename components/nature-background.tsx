"use client"

export default function NatureBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }} aria-hidden="true">
      {/* Nature background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/serene-nature-landscape-with-blue-sky--green-fores.jpg')`,
          filter: "brightness(0.7) saturate(1.2)",
        }}
      />

      {/* Blue-green gradient overlay for digital feel */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(0, 50, 80, 0.6) 0%, 
              rgba(0, 80, 60, 0.4) 30%, 
              rgba(10, 60, 90, 0.5) 70%, 
              rgba(0, 40, 70, 0.7) 100%
            )
          `,
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0, 20, 40, 0.4) 70%, rgba(0, 10, 30, 0.7) 100%)`,
        }}
      />
    </div>
  )
}
