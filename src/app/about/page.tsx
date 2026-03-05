"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, BookOpen, Target, Users } from "lucide-react";

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-white text-slate-900 pt-0">
            {/* Header Section - Full Screen "First Page" with Background */}
            <div className="relative flex flex-col items-center justify-center min-h-screen mb-0 overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2s] scale-105"
                    style={{ backgroundImage: "url('/about-hero-adaptive.png')" }}
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
                        className="mx-auto"
                    >
                        <span className="text-green-500 font-black uppercase tracking-[0.5em] mb-4 block text-sm drop-shadow-lg">About Prime Fitness Plus LLC</span>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
                            <span className="text-white [-webkit-text-stroke:2px_#195224] md:[-webkit-text-stroke:4px_#195224]">ABOUT</span> <span className="text-green-500">US.</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Subtle Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-green-500 to-transparent"></div>
                </motion.div>
            </div>

            {/* Our Identity Section - Informative Editorial Layout */}
            <section className="bg-slate-50/50 border-y border-slate-100 py-16 md:py-24 mb-16 md:mb-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Left Column: Heading and Main Info */}
                        <div className="lg:col-span-8 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <span className="text-green-600 font-bold uppercase tracking-[0.4em] text-xs">Official Registration</span>
                                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-slate-900">
                                    OUR <span className="text-green-600">IDENTITY.</span>
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-10"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Corporate Status</h3>
                                    <p className="text-slate-600 leading-relaxed font-light">
                                        Prime Fitness Plus, LLC is an active fitness company registered as a Limited Liability Company in <span className="text-slate-900 font-bold">Stockton, California, USA</span>. Our organization operates with full transparency and commitment to state-level standards.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Based in Stockton</h3>
                                    <p className="text-slate-600 leading-relaxed font-light">
                                        Strategically located at <span className="italic text-slate-900 font-medium">359 Gianna Way, Stockton, CA 95209</span>. This facility serves as the headquarters for our adaptive fitness community and management operations.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="p-8 bg-white border border-slate-200 rounded-2xl"
                            >
                                <p className="text-xl text-slate-700 leading-relaxed font-medium italic">
                                    "Categorized under 'FITNESS TRAINING' by the California Secretary of State, we are more than just a gym—we are a professional hub for athletic development and personal transformation."
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Column: Key Details & Data */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-12 flex flex-col justify-between space-y-12"
                        >
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-green-600 font-black uppercase tracking-widest text-[10px]">Business Type</span>
                                    <div className="text-3xl font-black uppercase tracking-tight text-slate-900">Fitness Training</div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-green-600 font-black uppercase tracking-widest text-[10px]">Registered Agent & CEO</span>
                                    <div className="text-3xl font-black uppercase tracking-tight text-slate-900 underline decoration-green-500/30">Eric Harry Davis</div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-12 border-t border-slate-100">
                                <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Facility Highlights</span>
                                <ul className="space-y-4">
                                    {["Adaptive & Accessible for All", "Weight Training", "Cardio Equipment", "Fully Inclusive Design", "Performance Hub"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-900 font-black uppercase tracking-tighter text-sm">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <div className="container mx-auto px-6 space-y-32 mb-32">
                {/* Eric Harry Davis Section (CEO) */}
                <div className="flex flex-col lg:flex-row gap-16 items-center pb-16 border-b border-slate-100">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100">
                            <img
                                src="/eric.jpeg"
                                alt="Eric Harry Davis"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-10 left-0 bg-slate-900 text-white py-4 px-8 rounded-r-2xl font-black text-xl shadow-xl">
                                CEO
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-6"
                    >
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                            Eric Harry <span className="text-green-600">Davis</span>
                        </h2>
                        <p className="text-green-600 font-bold uppercase tracking-widest text-sm">CES • AES (Elite) • Kinesiology Degree</p>

                        <div className="space-y-4 text-slate-600 leading-relaxed font-light">
                            <p className="text-lg font-normal text-slate-900 uppercase tracking-tight italic">
                                "Athleticism is expressed through purpose, resilience, and individuality."
                            </p>
                            <p>
                                Eric is a Corrective Exercise Specialist (CES) and Athletic Enhancement Specialist (AES - Elite) through the National Academy of Sports Medicine, with a formal degree in Kinesiology. As a pioneer in <span className="text-slate-900 font-bold underline decoration-green-500/30">Adaptive Performance</span> with over 22 years of experience, he brings unparalleled technical expertise in architecting protocols for athletes of all physical backgrounds.
                            </p>
                            <p>
                                He is passionate about redefining what it means to be an athlete. Eric believes athleticism is not confined to a specific look, background, or standard, but is expressed through purpose, resilience, and individuality—principles that form the bedrock of Prime's adaptive mission.
                            </p>
                            <p>
                                Eric leads with humility and accountability, fully aware of his own imperfections and committed to continuous growth. He disciplines his body and mind with intention, striving to live with integrity so that his actions align with the adaptive principles he teaches.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Parvinder Kaur Section (CEO) */}
                <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100">
                            <img
                                src="/2.jpeg"
                                alt="Parvinder Kaur"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute bottom-10 right-0 bg-slate-900 text-white py-4 px-8 rounded-l-2xl font-black text-xl shadow-xl">
                                CFO
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-6"
                    >
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                            Parvinder <span className="text-green-600">Kaur</span>
                        </h2>

                        <div className="space-y-4 text-slate-600 leading-relaxed font-light">
                            <p className="text-lg font-normal text-slate-900 uppercase tracking-tight italic">
                                "Empowering individuals through personalized care and innovative programming."
                            </p>
                            <p>
                                Parvinder Kaur brings over 15 years of leadership experience in the fitness and wellness industry. With a background in business management and a passion for health and fitness, she has dedicated her career to making fitness accessible and inclusive for all individuals.
                            </p>
                            <p>
                                Her leadership philosophy centers on empowerment, community building, and sustainable growth. Parvinder believes that fitness is not just about physical transformation, but about creating lasting positive change in people's lives through personalized care, innovative programming, and a supportive environment.
                            </p>
                            <p>
                                Under her guidance, PrimeFitness has expanded its reach while maintaining its core values of compassion, excellence, and inclusivity. She is committed to fostering a culture where every team member and client feels valued, supported, and empowered to achieve their fullest potential.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>


            {/* Mission & Values Section - Informative Editorial Layout */}
            <section className="py-20 md:py-32 relative overflow-hidden bg-slate-50/30 border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Static Sidebar Heading */}
                        <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit space-y-6">
                            <span className="text-green-600 font-bold uppercase tracking-[0.4em] text-xs">Our Foundation</span>
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-slate-900">
                                MISSION & <br /><span className="text-green-600">VALUES.</span>
                            </h2>
                            <p className="text-slate-500 font-light leading-relaxed max-w-sm">
                                Our principles are the bedrock of everything we do, guiding our interactions and shaping the future of adaptive performance.
                            </p>
                        </div>

                        {/* List of Values - Detailed Informative Layout */}
                        <div className="lg:w-2/3 space-y-24">
                            {[
                                { title: "Compassion", text: "We approach every individual with empathy and genuine care for their wellbeing. We believe that true growth happens in an environment where people feel seen, heard, and supported." },
                                { title: "Inclusivity", text: "Everyone deserves quality fitness training in welcoming spaces where all abilities are celebrated. Our facility and programs are built from the ground up to be accessible to all." },
                                { title: "Excellence", text: "We maintain the highest standards in training and service delivery for optimal outcomes. We never settle for 'good enough' when it comes to the safety and progress of our members." },
                                { title: "Community", text: "We foster supportive communities where individuals connect and grow together. Fitness is a journey that is better traveled with others who share your drive and respect your challenges." },
                                { title: "Innovation", text: "We continuously research and implement the latest adaptive performance techniques. Our methods are evidence-based and constantly evolving to provide the best possible results." },
                                { title: "Empowerment", text: "We believe in every person's potential to unlock strength, confidence, and independence. Our goal is to give you the tools and mindset to exceed your own expectations." }
                            ].map((value, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-baseline">
                                        <span className="text-slate-200 font-black text-6xl group-hover:text-green-600 transition-colors duration-500 shrink-0">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 group-hover:translate-x-2 transition-transform duration-500">
                                                {value.title}
                                            </h3>
                                            <p className="text-xl text-slate-600 leading-relaxed font-light border-l-2 border-slate-100 pl-8 group-hover:border-green-500 transition-colors duration-500">
                                                {value.text}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach Section - Informative Linear Story */}
            <section className="py-20 md:py-32 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mb-32">
                        <span className="text-green-600 font-bold uppercase tracking-[0.4em] text-xs block mb-4">Strategy & Methodology</span>
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
                            OUR <br /><span className="text-green-600">APPROACH.</span>
                        </h2>
                        <div className="h-2 w-24 bg-green-600 mt-12"></div>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-32">
                        {[
                            { step: "01", title: "Initial Assessment", text: "Every journey begins with a thorough assessment of your unique abilities, goals, and medical history. We don't believe in one-size-fits-all; we believe in understanding where you are to map out exactly where you can go." },
                            { step: "02", title: "Personalized Programming", text: "Our certified trainers develop individualized workout plans using evidence-based methods combined with adaptive equipment. Each program is a living document, evolving as you gain strength and confidence." },
                            { step: "03", title: "Ongoing Support", text: "We provide continuous support with regular progress evaluations and program adjustments. You are never alone in this process; we are with you at every milestone, ensuring you stay motivated and on track." },
                            { step: "04", title: "Holistic Wellness", text: "Beyond physical training, we address nutrition, mental wellbeing, and lifestyle factors. True fitness is a 360-degree endeavor that encompasses your entire life, not just the hours spent in the gym." }
                        ].map((approach, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row gap-12 items-start ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="w-full md:w-1/2 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-green-600 font-black text-2xl tracking-tighter">{approach.step}</span>
                                        <div className="h-px flex-1 bg-slate-200"></div>
                                    </div>
                                    <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                                        {approach.title}
                                    </h3>
                                    <p className="text-xl text-slate-600 leading-relaxed font-light">
                                        {approach.text}
                                    </p>
                                </div>
                                <div className="hidden md:block w-1/2">
                                    {/* Decorative element or space for imagery if needed later */}
                                    <div className="h-px w-full bg-slate-100 mt-12"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Motivational CTA Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1920&q=80')" }}
                ></div>

                {/* Gradient Overlay for Depth and Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10"></div>

                <div className="container mx-auto px-6 relative z-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <span className="text-green-500 font-bold uppercase tracking-[0.4em] block text-sm">Join the Movement</span>
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                                Ready to Join Our <span className="text-green-500">Community?</span>
                            </h2>

                            <div className="space-y-6">
                                <p className="text-2xl text-slate-200 font-light leading-relaxed">
                                    Experience the PrimeFitness difference and achieve your wellness goals.
                                </p>
                                <p className="text-lg text-slate-400 leading-relaxed max-w-xl italic border-l-4 border-green-600 pl-6">
                                    "Strength is not measured by where you start, but by the grit you show in moving forward. Whether you're an elite athlete or overcoming physical challenges, your potential is limitless here."
                                </p>
                            </div>

                            <div className="pt-6">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-green-900/20 active:scale-95 group cursor-pointer pointer-events-auto z-50 relative"
                                >
                                    Get in Touch
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
