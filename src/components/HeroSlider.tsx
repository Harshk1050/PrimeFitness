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

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight leading-tight uppercase font-heading drop-shadow-lg">
                            {images[currentSlide].title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto tracking-wide">
                            {images[currentSlide].subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 relative z-50">
                            <Link href="/contact" className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold text-white text-lg transition-colors pointer-events-auto cursor-pointer">
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