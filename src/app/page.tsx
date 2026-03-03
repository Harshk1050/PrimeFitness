"use client";

import { useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Users, Award, Clock, MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function Home() {
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
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      image: "/mental-wellness.png",
      title: "Mental Health Support",
      description: "Holistic, adaptive performance programs designed to support anxiety, depression, and cognitive wellness through mindful movement.",
    },
    {
      image: "/bedside-mobility.png",
      title: "Bedside Mobility",
      description: "Pioneering exercise protocols for those currently bedbound or with restricted mobility, ensuring fitness is accessible to all.",
    },
    {
      image: "/adaptive-strength.png",
      title: "Adaptive Strength",
      description: "Elite level strength training for athletes with physical disabilities, utilizing specialized equipment and expert coaching.",
    },
    {
      image: "/chronic-care.png",
      title: "Chronic Care Support",
      description: "Targeted training for long-term health challenges like MS, Parkinson's, and personalized stroke recovery protocols.",
    },
    {
      image: "/post-surgery-v2.png",
      title: "Post-Surgery Recovery",
      description: "Safe, expert-led re-entry into physical activity following medical procedures, prioritizing healing and functional strength.",
    },
    {
      image: "/neuro-spaces.png",
      title: "Neurodivergent Spaces",
      description: "A sensory-optimized, calm environment designed specifically for the comfort and focus of neurodivergent athletes.",
    },
    {
      image: "/pain-relief-v2.png",
      title: "Chronic Pain relief",
      description: "Gentle, science-backed movement strategies and mobility drills to help manage and mitigate chronic pain conditions.",
    },
    {
      image: "/para-sport.png",
      title: "Para-Sport Excellence",
      description: "Elite conditioning for competitive para-athletes, focusing on explosive performance and sport-specific training.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSlider />

      {/* Unique Features Section */}
      <section
        id="about"
        className="relative py-20 md:py-32 px-6 flex flex-col justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/page2bg.png')" }}
      >
        {/* Artistic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/80 backdrop-blur-[2px] z-0"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] z-0 px-4">
          <span className="text-[15vw] md:text-[20vw] font-black uppercase leading-none block">STRENGTH</span>
          <span className="text-[15vw] md:text-[20vw] font-black uppercase leading-none block text-green-600">LIMITLESS</span>
        </div>

        <div className="relative z-10 container mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-green-600 font-bold uppercase tracking-[0.3em] mb-4 block text-sm">Our Philosophy</span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-slate-900">
                WHY <br /><span className="text-transparent border-b-8 border-green-500 pb-2" style={{ WebkitTextStroke: '2px #0f172a' }}>CHOOSE</span> <br /><span className="text-green-600">PRIME?</span>
              </h2>
            </div>
            <p className="text-slate-600 max-w-sm text-xl font-medium leading-tight">
              Fitness That Adapts to <span className="text-slate-900 font-bold">You</span>
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${index === 0 || index === 2 || index === 5 || index === 7
                  ? "md:col-span-4"
                  : "md:col-span-8"
                  } group cursor-pointer`}
              >
                <div className="relative h-full min-h-[400px] bg-slate-900 rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-20px_rgba(22,163,74,0.3)] transition-all duration-700 ease-out group/card flex flex-col justify-end">
                  {/* Full Card Image */}
                  <div className="absolute inset-0 w-full h-full z-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 p-6 md:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                    {/* Floating Index Tag */}
                    <div className="mb-4 overflow-hidden">
                      <span className="text-green-500/90 text-6xl font-black leading-none tracking-tighter block translate-y-2 group-hover:translate-y-0 transition-all duration-500 drop-shadow-[0_2px_10px_rgba(34,197,94,0.3)]">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="bg-green-500 h-1 w-12 mb-6 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-125"></div>

                    <h3 className="text-3xl font-black mb-3 text-white tracking-tight leading-none uppercase">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-base font-medium max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Accent Glow */}
                  <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-green-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adaptive & Inclusive Performance Section */}
      <section id="adaptive" className="py-20 md:py-32 bg-white text-slate-900 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-100/50 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">

            {/* Content Side */}
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-12 bg-green-600"></div>
                  <span className="text-green-600 font-bold uppercase tracking-[0.3em] text-sm">Fitness For All</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-slate-900">
                  Inclusive Movement. Real Possibilities
                </h2>
              </div>

              <div className="text-slate-600 text-lg leading-relaxed space-y-6 font-medium max-w-xl">
                <p>
                  We believe strength is not about pushing beyond limits, it is about discovering what is possible for your body today.
                </p>
                <p>
                  Our adaptive wellness center is thoughtfully designed for individuals with mobility limitations, neurological conditions, recovery needs, and mental health challenges. Whether you are rebuilding strength after surgery, managing a chronic condition, navigating physical disability, or seeking structured movement for emotional well-being, we provide a safe and supportive environment tailored to you.
                </p>
                <p>
                  Here, progress is guided by professional assessment, individualized programming, and compassionate coaching. We adapt the training, not the person.
                </p>
                <p>
                  Because everybody deserves access to movement, dignity, and growth.
                </p>
              </div>

              {/* Feature Grid with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                {[
                  {
                    title: "Accessible by Design",
                    desc: "Wide pathways, wheelchair-friendly equipment, adjustable training stations, and calm spaces ensure that mobility challenges never become participation barriers.",
                    icon: <Award className="text-white" size={24} />
                  },
                  {
                    title: "Personalized Adaptive Coaching",
                    desc: "Our trainers design structured programs that consider medical history, functional capacity, neurological factors, and long-term wellness goals. Every session is supervised, safe, and paced to your ability.",
                    icon: <Users className="text-white" size={24} />
                  },
                  {
                    title: "Specialized Supportive Equipment",
                    desc: "From assisted resistance systems to gentle mobility tools, our equipment is selected to promote safe strength development, circulation improvement, balance training, and recovery support.",
                    icon: <Dumbbell className="text-white" size={24} />
                  },
                  {
                    title: "Inclusive Community Environment",
                    desc: "We foster a respectful, judgment-free space where individuals and caregivers feel understood. Small-group adaptive sessions encourage connection without competition or pressure.",
                    icon: <Clock className="text-white" size={24} />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="shrink-0 h-14 w-14 rounded-2xl bg-green-600 flex items-center justify-center shadow-[0_8px_16px_-6px_rgba(22,163,74,0.4)]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold uppercase tracking-wide mb-1 text-base">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Side */}
            <div className="lg:w-1/2 relative w-full">
              <div className="relative aspect-square sm:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-100 group">
                {/* Main Image */}
                <img
                  src="https://images.pexels.com/photos/8436608/pexels-photo-8436608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Trainer helping client in wheelchair"
                  className="w-full h-full object-cover transition-all duration-1000 ease-out"
                />

                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 p-10">
                  <div className="hidden sm:block border-r-2 border-b-2 border-green-600 w-24 h-24 absolute bottom-8 right-8 opacity-50"></div>
                </div>
              </div>

              {/* Background Shadow Effect */}
              <div className="absolute -top-12 -right-12 w-full h-full border border-green-600/10 rounded-[2.5rem] z-[-1]"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Unique CTA Section */}
      <section className="py-20 md:py-32 bg-slate-900 text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
        <div className="relative z-10 container mx-auto">
          <h2 className="text-4xl sm:text-6xl md:text-9xl font-black mb-12 text-white uppercase leading-none tracking-tighter">
            BREAK YOUR <br /><span className="text-green-500 italic">LIMITS.</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-20">
            <Link href="/contact" className="bg-green-500 text-slate-900 px-16 py-6 rounded-full font-black text-2xl uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_10px_0_0_#166534] active:shadow-none active:translate-y-[10px] inline-block cursor-pointer pointer-events-auto">
              Start Now
            </Link>
            <p className="text-slate-400 max-w-xs text-left font-bold uppercase tracking-widest text-sm border-l-4 border-slate-700 pl-6">
              Join 5000+ athletes already transforming their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="py-20 md:py-32 relative overflow-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80')" }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Side: Contact Information */}
            <div className="lg:w-2/5 space-y-12">
              <div>
                <span className="text-green-500 font-bold uppercase tracking-[0.3em] mb-4 block text-sm">Get In Touch</span>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter text-white mb-8">
                  LET'S <br /> <span className="text-green-500">CONNECT.</span>
                </h2>
                <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-md">
                  Have questions about our <span className="text-white font-bold">adaptive human performance</span> or membership? Our team is ready to help you start your journey.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-2">Location</h4>
                    <p className="text-slate-300 font-medium leading-snug">1154 South Roselle Road,<br />Schaumburg, IL 60193</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-2">Phone</h4>
                    <p className="text-slate-300 font-medium">630-237-6877</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-2">Email</h4>
                    <p className="text-slate-300 font-medium">info@primefitnessplusllc.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:w-3/5">
              <div className="bg-slate-900/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="home-contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                          <input
                            required
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-white/5 border-2 border-transparent focus:border-green-500 focus:bg-white/10 p-5 rounded-2xl transition-all outline-none font-medium text-white placeholder:text-slate-500"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                          <input
                            required
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border-2 border-transparent focus:border-green-500 focus:bg-white/10 p-5 rounded-2xl transition-all outline-none font-medium text-white placeholder:text-slate-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-white/5 border-2 border-transparent focus:border-green-500 focus:bg-white/10 p-5 rounded-2xl transition-all outline-none font-medium text-white placeholder:text-slate-500"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Inquiry Type</label>
                          <select name="inquiry" className="w-full bg-white/5 border-2 border-transparent focus:border-green-500 focus:bg-white/10 p-5 rounded-2xl transition-all outline-none font-medium text-white appearance-none cursor-pointer">
                            <option className="bg-slate-900">Personal Adaptive Fitness Training</option>
                            <option className="bg-slate-900">Adaptive Athletics</option>
                            <option className="bg-slate-900">Facility Membership</option>
                            <option className="bg-slate-900">Other / General Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                        <textarea
                          required
                          name="message"
                          placeholder="How can we help you achieve your goals?"
                          rows={5}
                          className="w-full bg-white/5 border-2 border-transparent focus:border-green-500 focus:bg-white/10 p-5 rounded-2xl transition-all outline-none font-medium text-white placeholder:text-slate-500 resize-none"
                        ></textarea>
                      </div>

                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className={`bg-green-600 ${isSubmitting ? 'opacity-50' : 'hover:bg-white hover:text-slate-900'} text-white w-full py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-4 group/btn`}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <Send className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" />}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="home-success-message"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6"
                    >
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-3xl font-black uppercase text-white tracking-tighter">Your inquiry is on its way!</h3>
                      <p className="text-slate-400 font-medium max-w-sm mx-auto">
                        Thank you for reaching out to Prime Fitness. One of our elite coaches will contact you shortly to discuss your goals.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="text-green-500 font-bold uppercase tracking-widest text-sm hover:underline"
                      >
                        Send another inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
