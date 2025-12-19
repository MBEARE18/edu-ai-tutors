'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface HeroSliderProps {
    children: React.ReactNode
}

export default function HeroSlider({ children }: HeroSliderProps) {
    const images = [
        'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80',
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [images.length])

    return (
        <section className="relative text-white py-20 md:py-32 overflow-hidden bg-gray-900 min-h-[600px] flex items-center">
            {/* Background Images */}
            {/* Background Images Container */}
            <div
                className="absolute inset-0 flex transition-transform duration-1000 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}
            >
                {images.map((img, index) => (
                    <div
                        key={img}
                        className="relative w-full h-full flex-shrink-0"
                    >
                        <Image
                            src={img}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Overlay for each image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/80 via-secondary-800/70 to-secondary-900/80" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {children}
            </div>
        </section>
    )
}
