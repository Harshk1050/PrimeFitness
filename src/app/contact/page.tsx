"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Instagram, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setIsSuccess(true);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900 pt-0">
            {/* Header Section - Full Screen "First Page" with Background */}
            <div className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2s] scale-105"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80')" }}
                >
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_transparent_100%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mx-auto relative z-10"
                    >
                        <span className="text-green-500 font-black uppercase tracking-[0.5em] mb-4 block text-sm drop-shadow-lg">Get in Touch</span>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
                            <span className="text-white [-webkit-text-stroke:2px_#195224] md:[-webkit-text-stroke:4px_#195224]">CONTACT</span> <span className="text-green-500">US.</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <section className="py-24 -mt-20 relative z-20">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Contact Information */}
                        <div className="lg:col-span-5 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-tight">
                                    Let's start your <br />
                                    <span className="text-green-600">transformation.</span>
                                </h2>
                                <p className="text-xl text-slate-600 font-light leading-relaxed">
                                    Whether you're looking for adaptive training, high-performance coaching, or simply want to learn more about our facility, our team is ready to assist you.
                                </p>
                            </motion.div>

                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6 items-start p-6 md:p-8 bg-white/60 backdrop-blur-xl border border-slate-100 rounded-3xl group hover:border-green-500 transition-colors duration-500 shadow-sm"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-500 border border-slate-50">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Headquarters</h4>
                                        <p className="text-lg font-bold text-slate-900 leading-tight">
                                            1154 S Roselle Rd, <br />
                                            Schaumburg, IL 60193, USA
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6 items-start p-8 bg-white/60 backdrop-blur-xl border border-slate-100 rounded-3xl group hover:border-green-500 transition-colors duration-500 shadow-sm"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-500 border border-slate-50">
                                        <Phone size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Call Us</h4>
                                        <p className="text-lg font-bold text-slate-900">630-237-6877</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6 items-start p-8 bg-white/60 backdrop-blur-xl border border-slate-100 rounded-3xl group hover:border-green-500 transition-colors duration-500 shadow-sm"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-500 border border-slate-50">
                                        <Mail size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Email Us</h4>
                                        <p className="text-lg font-bold text-slate-900">info@primefitnessplusllc.com</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6 items-start p-8 bg-white/60 backdrop-blur-xl border border-slate-100 rounded-3xl group hover:border-green-500 transition-colors duration-500 shadow-sm"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-500 border border-slate-50">
                                        <Clock size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Hours</h4>
                                        <p className="text-lg font-bold text-slate-900 uppercase">Mon-Fri 9AM - 6PM</p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                                className="pt-8 border-t border-slate-100"
                            >
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 text-center lg:text-left">Follow Our Journey</h4>
                                <div className="flex justify-center lg:justify-start gap-4">
                                    <a href="https://www.instagram.com/prime.fitnessplus" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-green-600 hover:scale-110 transition-all duration-500 shadow-xl">
                                        <Instagram size={28} />
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7 bg-white/80 backdrop-blur-2xl p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-white overflow-hidden relative"
                        >
                            <AnimatePresence mode="wait">
                                {!isSuccess ? (
                                    <motion.form
                                        key="contact-form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="grid md:grid-cols-2 gap-8"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                                            <input
                                                required
                                                name="name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                                            <input
                                                required
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Inquiry Type</label>
                                            <select name="inquiry" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium appearance-none cursor-pointer">
                                                <option>Personal Adaptive Fitness Training</option>
                                                <option>Adaptive Athletics</option>
                                                <option>Facility Membership</option>
                                                <option>Other / General Inquiry</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Message</label>
                                            <textarea
                                                required
                                                name="message"
                                                rows={6}
                                                placeholder="Tell us about your goals..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium resize-none"
                                            ></textarea>
                                        </div>
                                        <div className="md:col-span-2 pt-4">
                                            <button
                                                disabled={isSubmitting}
                                                type="submit"
                                                className={`w-full ${isSubmitting ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-500'} text-white py-6 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-green-900/20 flex items-center justify-center gap-4 group`}
                                            >
                                                {isSubmitting ? "Sending..." : "Send Message"}
                                                {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success-message"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full py-20 flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Message Received!</h3>
                                        <p className="text-xl text-slate-600 font-light max-w-sm">
                                            Thank you for reaching out. Our team will get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setIsSuccess(false)}
                                            className="text-green-600 font-bold uppercase tracking-widest text-sm hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section or Office Visual */}
            <div className="container mx-auto px-6 pb-24">
                <div className="relative h-[400px] md:h-[600px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.5137812548843!2d-88.0772744!3d42.0101416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880faed8b0000001%3A0x1d3c0b0a0a0a0a0a!2s1154%20S%20Roselle%20Rd%2C%20Schaumburg%2C%20IL%2060193!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="absolute top-10 right-10 bg-white p-6 rounded-3xl shadow-xl max-w-xs pointer-events-none border border-slate-100 hidden md:block">
                        <span className="text-green-600 font-black uppercase tracking-widest text-[10px] block mb-2">Our Location</span>
                        <p className="font-bold text-slate-900 leading-tight">We're based in the heart of Schaumburg's athletic community.</p>
                    </div>
                </div>
            </div>
        </main >
    );
};

export default ContactPage;
