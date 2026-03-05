"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        {
            url: "/slide3.jpg",
            title: "Inclusive Movement for Mobility, Recovery, and Mental Wellness",
            subtitle: "Movement is not just physical; it supports emotional and cognitive well-being too.",
        },
        {
            url: "/slide1.jpg",
            title: "Fitness Without Barriers",
            subtitle: "Our gym welcomes athletes of all abilities, including adaptive and disabled athletes.",
        },
        {
            url: "/slide2.jpg",
            title: "Accessible Facilities. Personalized Support. Zero Barriers.",
            subtitle: "Our center is designed with accessibility at its core.",
        },
        {
            url: "/slide4.jpg",
            title: "Empowering Every Body",
            subtitle: "Adaptive fitness programs designed to meet your unique needs and goals.",
        },
        {
            url: "/slide5.jpg",
            title: "Accessible and Inclusive",
            subtitle: "State-of-the-art accessible equipment and specialized coaching for everyone.",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Slider */}
            <div className="absolute inset-0 w-full h-full">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: index === currentSlide ? 1 : 0,
                            scale: index === currentSlide ? 1 : 1.05
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${image.url})` }}
                    />
                ))}
            </div>

            {/* Premium Overlay System: Protects text readability while keeping the image vibrant */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-[1]" />

            {/* Hero Content - Sophisticated bottom-left placement */}
            <div className="relative z-10 flex flex-col items-start justify-end h-full text-left px-6 md:px-16 pb-16 md:pb-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4 md:space-y-6 max-w-3xl"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1] font-heading drop-shadow-xl">
                            {images[currentSlide].title}
                        </h1>
                        <p className="text-base md:text-xl text-gray-200 font-medium max-w-xl tracking-wide leading-relaxed drop-shadow-md">
                            {images[currentSlide].subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-start pt-4 relative z-50">
                            <Link href="/contact" className="px-10 py-4 bg-green-500 hover:bg-white hover:text-slate-900 rounded-full font-black text-slate-900 text-lg transition-all hover:scale-105 shadow-2xl pointer-events-auto cursor-pointer uppercase tracking-widest">
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "bg-green-500 w-8"
                            : "bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;