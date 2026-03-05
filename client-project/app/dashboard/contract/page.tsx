"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

const easeOutBack: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

function GlassCard({
    title,
    description,
}: {
    title: string
    description: string
}) {
    const ref = useRef<HTMLDivElement | null>(null)

    // --- 3D tilt (subtle) ---
    const mx = useMotionValue(0)
    const my = useMotionValue(0)

    const rx = useTransform(my, [-0.5, 0.5], [6, -6])
    const ry = useTransform(mx, [-0.5, 0.5], [-8, 8])

    const rotateX = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.6 })
    const rotateY = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.6 })

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width // 0..1
        const y = (e.clientY - rect.top) / rect.height // 0..1
        mx.set(x - 0.5)
        my.set(y - 0.5)
    }

    const onLeave = () => {
        mx.set(0)
        my.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutBack }}
            whileHover={{ y: -8 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={[
                "relative rounded-2xl p-6",
                "backdrop-blur-[20px] bg-white/10",
                "border border-white/20",
                "shadow-[0_20px_80px_rgba(0,0,0,0.35)]",
                "will-change-transform",
            ].join(" ")}
        >
            {/* inner highlight */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.02) 100%)",
                }}
            />

            {/* subtle edge glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
            />

            {/* noise texture (must keep) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.015]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
                }}
            />

            <div className="relative" style={{ transform: "translateZ(0px)" }}>
                <h2 className="text-xl font-medium mb-2">{title}</h2>
                <p className="text-sm opacity-70">{description}</p>
            </div>
        </motion.div>
    )
}

export default function ContractPage() {
    return (
        <div className="p-10 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold">契約書</h1>
                <p className="text-sm opacity-70">
                    契約履歴の確認と、PDFの閲覧ができます。
                </p>
            </div>

            <GlassCard
                title="契約書一覧"
                description="契約履歴がここに表示されます。"
            />
        </div>
    )
}