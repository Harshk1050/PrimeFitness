"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";

const trainers = [
    {
        name: "Eric Harry Davis",
        role: "CEO & Elite Specialist",
        image: "/eric.jpeg",
        specialties: ["Adaptive Performance", "Corrective Exercise", "Elite Athletics"],
        bio: "Eric is a Corrective Exercise Specialist (CES) and Athletic Enhancement Specialist (AES - Elite) through the National Academy of Sports Medicine, with a formal degree in Kinesiology. With over 22 years of experience, he brings unparalleled technical expertise in architecting protocols for athletes of all physical backgrounds. Eric is passionate about redefining what it means to be an athlete, believing it is not confined to a specific look but expressed through purpose and resilience. He leads with humility, committed to live with integrity so that his actions align with what he teaches.",
        instagram: "https://www.instagram.com/prime.fitnessplus"
    },
    {
        name: "Parvinder Kaur",
        role: "CFO & Operations Lead",
        image: "/2.jpeg",
        specialties: ["Adaptive Performance", "Business Leadership", "Community Empowerment"],
        bio: "Over 15 years of leadership in the fitness and wellness industry. Dedicated to making fitness accessible and inclusive through innovative programming. Her leadership philosophy centers on empowerment and community building. She believes that fitness is about creating lasting positive change through personalized care and a supportive environment.",
        instagram: "https://www.instagram.com/prime.fitnessplus"
    },
    {
        name: "Demetrius Brown",
        role: "Trainer & Nutritional Advocate",
        image: "/Demetrius.png",
        specialties: ["Adaptive Performance", "Sports Management", "Nutrition & Wellness"],
        bio: "Demetrius is a former collegiate football player at Huntingdon College in Montgomery, Alabama, where he earned a Bachelor's degree in Sports Management. He has over a year of experience working in employment services and fitness training for individuals with disabilities. Demetrius is also an advocate for health and wellness products and is currently working toward his Nutritionist Certification through ISSA, further expanding his ability to support healthy, active lifestyles.",
        instagram: "https://www.instagram.com/prime.fitnessplus"
    },
    {
        name: "Tucker Baird",
        role: "Trainer & Rehabilitation Specialist",
        image: "/tucker.png",
        specialties: ["Adaptive Performance", "Clinical Rehabilitation", "Strength & Conditioning"],
        bio: "Tucker Baird is an NASM Certified Personal Trainer currently studying kinesiology with a specialty in clinical rehabilitation. My background in collegiate baseball, bodybuilding, and powerlifting gives me a strong foundation in strength and performance, but my true passion is helping people of all abilities feel confident and capable in their bodies. I value integrity, hard work, and creating a training environment where every client feels supported and respected.",
        instagram: "https://www.instagram.com/prime.fitnessplus"
    },
    {
        name: "Arshdeep Singh",
        role: "Adaptive Performance Specialist",
        image: "/arshdeep.png",
        specialties: ["Adaptive Performance", "Functional Mobility", "Safety & Mechanics"],
        bio: "Arshdeep is a personal trainer specializing in adaptive performance, with experience supporting clients through structured and individualized training. He focuses on building strength, mobility, and confidence using clear communication, consistent routines, and evidence-based movement strategies. His approach prioritizes safety, patience, and long-term functional progress for clients of all abilities.",
        instagram: "https://www.instagram.com/prime.fitnessplus"
    },
    {
        name: "Arman Haq",
        role: "Adaptive Performance & Movement Specialist",
        image: "/haq_final.jpg",
        specialties: ["Adaptive Performance", "Rehab-to-Performance", "Individualized Mechanics"],
        bio: "Arman specializes in architecting specialized movement pathways for individuals with complex physical and sensory needs. With a deep focus on bridging the gap between clinical rehabilitation and high-performance training, he combines evidence-based biomechanics with a client-first philosophy. Arman is dedicated to ensuring that every athlete—regardless of their starting point—discovers their uncompromising peak through safety, precision, and patient, expert-led coaching.",
        instagram: "https://www.instagram.com/prime.fitnessplus"
    },
    {
        name: "Evan James Brizendine",
        role: "Strength & Conditioning Lead",
        image: "/Evan.png",
        specialties: ["Adaptive Performance", "CSCS", "Athlete Development"],
        bio: "Accomplished strength and conditioning coach with experience leading comprehensive training programs for 250+ collegiate athletes across 15 sports. Successfully designed and implemented safe, performance-driven programs improving strength, power, speed, and injury resilience. A proven leader who supervised and mentored coaches, managed weight room operations, and delivered consistent, high-quality athlete development. Brings additional expertise training diverse populations—from high school and collegiate athletes to older adults with comorbidities—supported by advanced certifications including CSCS and Senior Fitness Specialist.",
        instagram: "https://www.instagram.com/prime.fitnessplus"
    }
];

const TrainerCard = ({ trainer, idx }: { trainer: typeof trainers[0], idx: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Character limit for collapsed view
    const limit = 120;
    const isLongBio = trainer.bio.length > limit;
    const displayBio = isExpanded || !isLongBio ? trainer.bio : `${trainer.bio.substring(0, limit)}...`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row"
        >
            {/* Trainer Image */}
            <div className="md:w-1/2 relative aspect-[4/5] md:aspect-auto overflow-hidden">
                <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>

            {/* Trainer Info */}
            <div className="md:w-1/2 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600">{trainer.role}</span>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none group-hover:text-green-600 transition-colors">
                        {trainer.name.split(' ').map((word, i) => (
                            <span key={i} className={i === trainer.name.split(' ').length - 1 ? "text-green-600" : ""}>{word} </span>
                        ))}
                    </h3>

                    <div className="relative">
                        <motion.p
                            layout
                            className="text-slate-500 font-medium leading-relaxed italic border-l-2 border-green-500/30 pl-6"
                        >
                            {displayBio}
                        </motion.p>

                        {isLongBio && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-4 flex items-center gap-1 text-green-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors ml-6"
                            >
                                {isExpanded ? (
                                    <>Show Less <ChevronUp size={14} /></>
                                ) : (
                                    <>Read More <ChevronDown size={14} /></>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                        {trainer.specialties.map((spec, sIdx) => (
                            <span key={sIdx} className="px-4 py-1.5 bg-slate-50 text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100 transition-colors hover:bg-green-600 hover:text-white hover:border-green-600">
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TrainersPage = () => {
    return (
        <main className="min-h-screen bg-white text-slate-900 pt-0">
            {/* Header Section - Cinematic Hero */}
            <div className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2s] scale-105"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577221084712-45b0445d2b00?auto=format&fit=crop&w=1920&q=80')" }}
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
                        className="mx-auto text-shadow-none"
                    >
                        <span className="text-green-500 font-black uppercase tracking-[0.5em] mb-4 block text-sm drop-shadow-lg">Industry Professionals</span>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
                            <span className="text-white [-webkit-text-stroke:2px_#195224] md:[-webkit-text-stroke:4px_#195224]">OUR</span> <span className="text-green-500">TEAM.</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Trainers Grid */}
            <section className="py-20 md:py-24 -mt-20 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {trainers.map((trainer, idx) => (
                            <TrainerCard key={idx} trainer={trainer} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Credibility / Why Us Section - Improved Editorial Layout */}
            <section className="py-20 md:py-32 bg-slate-50 border-y border-slate-100 mb-16 md:mb-24 relative overflow-hidden">
                {/* Background decorative text */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20rem] font-black text-slate-200/20 select-none pointer-events-none tracking-tighter whitespace-nowrap">
                    PRIME PERFORMANCE
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
                        {[
                            {
                                title: "Certified Elite",
                                text: "Our trainers hold elite-level certifications from NASM and backgrounds in Kinesiology, ensuring safe and evidence-based transformation."
                            },
                            {
                                title: "Adaptive Performance",
                                text: "We specialize in inclusive training environments, making elite fitness accessible to athletes of all physical backgrounds and abilities."
                            },
                            {
                                title: "Science Backed",
                                text: "Leveraging the latest in sports science and corrective exercise to build programs that work as hard as you do."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="space-y-6 group"
                            >
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-black text-green-600/20 tabular-nums">0{idx + 1}</span>
                                    <div className="h-px flex-1 bg-slate-200 mt-4 group-hover:bg-green-600 transition-colors duration-500"></div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-slate-500 font-medium leading-relaxed text-lg italic border-l-2 border-slate-100 pl-6 group-hover:border-green-500 transition-colors duration-500">
                                        {item.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 pb-24">
                <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600/10 skew-x-12 translate-x-32 pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl space-y-8">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                            Ready to Train with <span className="text-green-600">The Best?</span>
                        </h2>
                        <p className="text-xl text-slate-400 font-medium max-w-xl">
                            Our team is ready to help you unlock your full potential. Book a consultation with one of our specialists today.
                        </p>
                        <a href="/contact" className="inline-flex items-center gap-6 bg-green-600 hover:bg-white hover:text-green-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 group/btn">
                            Book Consultation
                            <Zap size={20} className="fill-current group-hover/btn:animate-pulse" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TrainersPage;
