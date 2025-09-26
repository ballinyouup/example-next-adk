"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import {useEffect, useState} from "react";

export default function HomePage() {
    const [data, setData] = useState<{message: string, timestamp: string} | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch("/api/")
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                const result = await res.json()
                setData(result)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    return (
        <div className="min-h-screen bg-background">
            <Header />
            {/* Debug section to show API data */}
            <div className="p-4 bg-gray-100 text-center">
                {loading && <p>Loading API data...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {data && (
                    <div>
                        <p className="text-green-600">✅ API Connected!</p>
                        <p>Message: {data.message}</p>
                        <p>Timestamp: {data.timestamp}</p>
                    </div>
                )}
            </div>
            <main>
                <HeroSection />
                <FeaturesSection />
                <TestimonialsSection />
                <PricingSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}