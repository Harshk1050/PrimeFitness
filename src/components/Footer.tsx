"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative bg-white text-slate-900 pt-32 pb-10 overflow-hidden border-t border-slate-100">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600/30 to-transparent"></div>

            {/* Abstract Green "Artwork" Shapes */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
            <div className="absolute top-1/2 -left-20 w-80 h-80 bg-green-50/50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

            {/* Decorative Geometric Accent */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-2 opacity-15 pointer-events-none">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-1 rounded-full ${i === 3 ? 'bg-green-600 w-16' : 'bg-slate-300 w-8'}`}></div>
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-green-100 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Image
                                    src="/FullLogo-Photoroom.svg"
                                    alt="Prime Fitness"
                                    width={70}
                                    height={70}
                                    className="h-14 w-auto object-contain relative transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase">
                                PRIME<span className="text-green-600">FITNESS</span>
                            </span>
                        </Link>
                        <div className="space-y-4">
                            <p className="text-slate-500 leading-relaxed font-medium text-sm max-w-sm">
                                Elevating the athletic experience through adaptive training and high-performance methodology. Join us at our premier Stockton facility.
                            </p>
                            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-green-100">
                                Mon-Fri 9AM - 6PM
                            </span>
                        </div>

                    </div>

                    {/* Quick Links & Focus Grid */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Navigation</h4>
                            <ul className="space-y-4">
                                {["Home", "About", "Trainers", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href={item === "About" ? "/about" : item === "Contact" ? "/contact" : item === "Trainers" ? "/trainers" : "/"}
                                            className="text-slate-600 hover:text-green-600 transition-colors duration-300 font-bold text-sm uppercase tracking-wider block"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Our Focus</h4>
                            <ul className="space-y-4">
                                {["Adaptive", "Performance", "Strength", "Holistic"].map((item) => (
                                    <li key={item}>
                                        <span className="text-slate-600 font-bold text-sm uppercase tracking-wider block">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8 lg:pl-12 lg:border-l lg:border-slate-100">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Direct Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-700 leading-tight">
                                    Stockton, CA 95209
                                </span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                    <Phone size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">+1 (209) 712-2421</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                    <Mail size={18} />
                                </div>
                                <span className="text-sm font-bold text-slate-700">info@primefitnessplusllc.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <p>© {new Date().getFullYear()} PRIME FITNESS PLUS LLC</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-green-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-green-600 transition-colors">Terms</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-slate-100"></div>
                        <span className="text-slate-300">EST. 2024</span>
                        <div className="w-8 h-px bg-slate-100"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
