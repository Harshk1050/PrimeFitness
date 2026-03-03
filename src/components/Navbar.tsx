"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check scroll position on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Trainers", href: "/trainers" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || !isHome
                ? "bg-green-600 py-3 shadow-lg border-b border-green-700"
                : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 group">
                    <Image
                        src="/FullLogo-Photoroom.svg"
                        alt="Prime Fitness"
                        width={80}
                        height={80}
                        className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        priority
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`transition-colors duration-300 font-medium text-base tracking-wide uppercase cursor-pointer ${scrolled || !isHome ? "text-white hover:text-slate-900" : "text-white/90 hover:text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/contact" className={`${scrolled || !isHome ? "bg-white text-green-600 hover:bg-slate-100" : "bg-green-600 hover:bg-green-700 text-white"
                        } px-6 py-2 rounded-md font-bold text-base transition-colors shadow-sm cursor-pointer z-50 pointer-events-auto`}>
                        Join Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white transition-colors relative z-50 pointer-events-auto"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-green-600 border-t border-green-500 overflow-hidden shadow-xl"
                    >
                        <div className="flex flex-col items-center py-8 gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl text-white hover:text-slate-900 font-medium transition-colors cursor-pointer"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="bg-white text-green-600 px-8 py-3 rounded-md font-bold w-3/4 shadow-md hover:bg-slate-100 transition-colors text-center cursor-pointer pointer-events-auto z-50">
                                Join Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
