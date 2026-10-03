// components/EventModal.jsx
'use client';
import { useState, useEffect } from 'react';

export default function EventPopUp() {
  const [isOpen, setIsOpen] = useState(true);
  const [copyText, setCopyText] = useState('Share Invite');

  // Inject Tailwind CDN, config, fonts, and custom CSS
  useEffect(() => {
    // ---------- 1. Google Fonts & Material Symbols ----------
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap';
    document.head.appendChild(fontLink);

    const materialLink = document.createElement('link');
    materialLink.rel = 'stylesheet';
    materialLink.href =
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(materialLink);

    // ---------- 2. Tailwind config (must be set BEFORE CDN script) ----------
    const configScript = document.createElement('script');
    configScript.textContent = `
      window.tailwind = {
        config: {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                "surface-container-lowest": "#ffffff",
                "on-primary": "#ffffff",
                "on-tertiary": "#ffffff",
                "surface-dim": "#cfdaf2",
                "secondary-container": "#fea619",
                "surface-container-low": "#f0f3ff",
                "secondary-fixed": "#ffddb8",
                "inverse-surface": "#263143",
                "on-error": "#ffffff",
                "primary-fixed": "#dee1ff",
                "on-tertiary-fixed-variant": "#004e5c",
                "on-secondary-fixed-variant": "#653e00",
                "error": "#ba1a1a",
                "primary-fixed-dim": "#b9c3ff",
                "secondary": "#855300",
                "outline": "#747688",
                "on-primary-container": "#dde0ff",
                "tertiary-fixed": "#acedff",
                "on-tertiary-container": "#a9ecff",
                "primary": "#0037d0",
                "on-secondary-fixed": "#2a1700",
                "outline-variant": "#c4c5d9",
                "inverse-on-surface": "#ecf1ff",
                "inverse-primary": "#b9c3ff",
                "on-error-container": "#93000a",
                "on-secondary-container": "#684000",
                "tertiary-fixed-dim": "#4cd7f6",
                "on-secondary": "#ffffff",
                "on-primary-fixed-variant": "#0032c3",
                "on-tertiary-fixed": "#001f26",
                "on-primary-fixed": "#001258",
                "surface": "#f9f9ff",
                "on-background": "#111c2d",
                "surface-tint": "#0b46f9",
                "surface-bright": "#f9f9ff",
                "primary-container": "#1b4dff",
                "tertiary": "#005463",
                "surface-container-highest": "#d8e3fb",
                "error-container": "#ffdad6",
                "surface-container-high": "#dee8ff",
                "tertiary-container": "#006e81",
                "surface-container": "#e7eeff",
                "secondary-fixed-dim": "#ffb95f",
                "background": "#f9f9ff",
                "on-surface": "#111c2d",
                "surface-variant": "#d8e3fb",
                "on-surface-variant": "#434656"
              },
              borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
              },
              spacing: {
                "gutter-md": "1.5rem",
                "margin-md": "2rem",
                "space-xs": "0.25rem",
                "space-sm": "0.5rem",
                "space-md": "1rem",
                "gutter": "1rem",
                "space-xl": "2rem",
                "margin": "1rem",
                "space-lg": "1.5rem"
              },
              fontFamily: {
                "headline-lg-mobile": ["Outfit"],
                "headline-xl-mobile": ["Outfit"],
                "headline-md": ["Outfit"],
                "body-sm": ["Plus Jakarta Sans"],
                "body-lg": ["Plus Jakarta Sans"],
                "headline-xl": ["Outfit"],
                "label-lg": ["Plus Jakarta Sans"],
                "label-sm": ["Plus Jakarta Sans"],
                "headline-sm": ["Outfit"],
                "body-md": ["Plus Jakarta Sans"],
                "headline-lg": ["Outfit"],
                "label-md": ["Plus Jakarta Sans"]
              },
              fontSize: {
                "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "700" }],
                "headline-xl-mobile": ["30px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "800" }],
                "headline-md": ["22px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
                "body-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "800" }],
                "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "700" }],
                "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "600" }],
                "headline-sm": ["18px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "600" }],
                "body-md": ["15px", { lineHeight: "22px", fontWeight: "400" }],
                "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.015em", fontWeight: "700" }],
                "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.03em", fontWeight: "600" }]
              }
            }
          }
        }
      };
    `;
    document.head.appendChild(configScript);

    // ---------- 3. Tailwind CDN script ----------
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwindScript);

    // ---------- 4. Custom CSS ----------
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      ::-webkit-scrollbar { display: none; }
      @layer base {
        html, body { margin: 0; padding: 0; }
        body { overscroll-behavior: none; }
      }
      .animate-in {
        animation: fadeInZoom 0.25s ease-out forwards;
      }
      @keyframes fadeInZoom {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      // Cleanup not strictly necessary for a single-use modal
    };
  }, []);

  // ---------- Handlers ----------
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleCopyInvite = async () => {
    const textToCopy =
      'Join Prime Fitness Plus LLC for the Walk for Autism Awareness! Walk-ins welcome, free shirts for first 200, raffle prizes & vendor market. Saturday, April 26 at Riverside Metro Park!';
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyText('Copied Link!');
      setTimeout(() => setCopyText('Share Invite'), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopyText('Copied Link!');
      setTimeout(() => setCopyText('Share Invite'), 2500);
    }
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeModal();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // ---------- Render ----------
  if (!isOpen) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-900/60 p-4">
        <button
          onClick={openModal}
          className="px-6 py-3 bg-primary text-white rounded-xl shadow-lg font-label-lg hover:bg-primary-container transition"
        >
          Open Event Details
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col w-full relative">
        <div className="w-full flex items-center justify-center" id="eventModalOverlay">
          
          {/* MODAL DIALOG CONTAINER */}
          <div
            aria-labelledby="modalTitle"
            aria-modal="true"
            className="relative w-full max-w-[760px] max-h-[95vh] overflow-y-auto bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col transition-all duration-300 transform scale-100 animate-in"
            role="dialog"
          >
            
            {/* STICKY TOP CONTROLS / CLOSE ACTION */}
            <div className="absolute top-5 right-5 z-20">
              <button
                aria-label="Close dialog"
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md group"
                onClick={closeModal}
              >
                <span className="material-symbols-outlined text-[22px] transition-transform group-hover:rotate-90">
                  close
                </span>
              </button>
            </div>

            {/* MODAL HEADER MEDIA BANNER */}
            <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-[32px] flex-shrink-0">
              <img
                alt="Walk for Autism Awareness participants walking happily outdoors"
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-100"
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop"
              />
              {/* Gradient Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
              
              {/* Banner Top Meta Tags */}
              <div className="absolute top-5 left-6 flex items-center gap-3 z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-blue-800 font-label-sm text-[11px] font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  COMMUNITY EVENT NOTICE
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEA619] text-[#653E00] font-label-sm text-[11px] font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">star</span>
                  Prime Fitness Plus LLC
                </span>
              </div>

              {/* Bottom Overlaid Content Title */}
              <div className="absolute bottom-5 left-6 right-6 z-10 flex flex-col">
                <div className="flex items-center gap-2 text-cyan-300 font-label-md text-[12px] font-bold uppercase tracking-widest mb-2 drop-shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">diversity_1</span>
                  <span>ANNUAL COMMUNITY MOVEMENT INITIATIVE</span>
                </div>
                <h2 className="font-headline-lg text-[32px] sm:text-[40px] font-extrabold text-white drop-shadow-md tracking-tight leading-tight" id="modalTitle">
                  Walk for Autism Awareness
                </h2>
              </div>
            </div>

            {/* ENERGETIC ANNOUNCEMENT BANNER STRIP - HIGHLIGHTED TEXT */}
            <div className="w-full bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#FDE68A] text-[#684000] px-5 py-4 flex items-center justify-center gap-3 shadow-inner text-center">
              <span className="text-[18px]">〰️</span>
              <p className="font-label-lg text-[14px] font-extrabold tracking-wide uppercase bg-yellow-300 text-black px-4 py-1.5 rounded-lg shadow-md border-2 border-yellow-500 animate-pulse">
                REGISTRATION IS CLOSED — WALK-INS ARE WELCOME!
              </p>
              <span className="text-[18px]">〰️</span>
            </div>

            {/* MAIN BODY CONTENT */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Welcoming Introduction Message */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex p-2 rounded-xl bg-[#E0E7FF] text-blue-700">
                    <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                  </span>
                  <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">You Can Still Walk With Us!</h3>
                </div>
                <p className="font-body-md text-[15px] text-slate-600 leading-relaxed">
                  Online registration is now officially closed, <strong className="text-slate-900 font-semibold">but everyone is still warmly welcome to join us!</strong> Gather your family, teammates, and friends for an inspiring day celebrating community, awareness, shared connection, and uplifting collective health.
                </p>
              </div>

              {/* 2x2 VALUE HIGHLIGHT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Card 1: Custom T-Shirts */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] transition-all duration-200 hover:bg-slate-50 hover:shadow-sm flex flex-col justify-between border-l-4 border-cyan-400">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[22px]">dry_cleaning</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#CFFAFE] text-[#164E63] font-label-sm text-[11px] font-bold">
                        First 200 Guests
                      </span>
                    </div>
                    <h4 className="font-label-lg text-[14px] font-extrabold text-slate-900 uppercase tracking-wide mb-2">
                      FREE CUSTOM PRIME T-SHIRTS
                    </h4>
                    <p className="font-body-sm text-[13px] text-slate-600 leading-relaxed">
                      The first 200 registered walk-in and confirmed participants to check in will receive a complimentary official Prime Fitness 2025 event shirt.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 flex items-center gap-2 text-cyan-600 font-label-sm text-[12px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Available at Check-In Tent</span>
                  </div>
                </div>

                {/* Card 2: Raffle & Giveaways */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] transition-all duration-200 hover:bg-slate-50 hover:shadow-sm flex flex-col justify-between border-l-4 border-orange-400">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#FFEDD5] text-[#9A3412] font-label-sm text-[11px] font-bold">
                        Exciting Prizes
                      </span>
                    </div>
                    <h4 className="font-label-lg text-[14px] font-extrabold text-slate-900 uppercase tracking-wide mb-2">
                      RAFFLE PRIZES &amp; GIVEAWAYS
                    </h4>
                    <p className="font-body-sm text-[13px] text-slate-600 leading-relaxed">
                      Enter on-site for a chance to win a 55” Smart 4K TV, Shark Vacuum, portable JBL Bluetooth Speakers, Ninja Air Fryers, and fitness bundles!
                    </p>
                  </div>
                  <div className="mt-5 pt-3 flex items-center gap-2 text-orange-500 font-label-sm text-[12px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>Raffle draws begin at 11:30 AM</span>
                  </div>
                </div>

                {/* Card 3: Community Vendors & Resources */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] transition-all duration-200 hover:bg-slate-50 hover:shadow-sm flex flex-col justify-between border-l-4 border-orange-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-400 text-white flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[22px]">diversity_3</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#FED7AA] text-[#9A3412] font-label-sm text-[11px] font-bold">
                        20+ Organizations
                      </span>
                    </div>
                    <h4 className="font-label-lg text-[14px] font-extrabold text-slate-900 uppercase tracking-wide mb-2">
                      COMMUNITY RESOURCES &amp; VENDORS
                    </h4>
                    <p className="font-body-sm text-[13px] text-slate-600 leading-relaxed">
                      Meet local sensory-wellness organizations, therapy networks, nutrition coaches, and connect directly with local families and care teams.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 flex items-center gap-2 text-orange-400 font-label-sm text-[12px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">support_agent</span>
                    <span>Interactive Resource Pavilions</span>
                  </div>
                </div>

                {/* Card 4: Open Walk Participation */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] transition-all duration-200 hover:bg-slate-50 hover:shadow-sm flex flex-col justify-between border-l-4 border-blue-600">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[22px]">directions_walk</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-label-sm text-[11px] font-bold">
                        Open Course
                      </span>
                    </div>
                    <h4 className="font-label-lg text-[14px] font-extrabold text-slate-900 uppercase tracking-wide mb-2">
                      NO PRE-REGISTRATION NEEDED
                    </h4>
                    <p className="font-body-sm text-[13px] text-slate-600 leading-relaxed">
                      Come walk at your own pace (1K, 3K, or full 5K loop), enjoy live DJ music, food trucks, lawn games, and stand united for neurodiversity awareness.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 flex items-center gap-2 text-blue-600 font-label-sm text-[12px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">sentiment_very_satisfied</span>
                    <span>All Ages &amp; Strollers Welcome</span>
                  </div>
                </div>

              </div>

              {/* EVERYONE IS WELCOME RIBBON */}
              <div className="w-full bg-[#EFF6FF] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border border-blue-100">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </span>
                  <div>
                    <p className="font-label-lg text-[14px] font-bold text-blue-700 tracking-wide">
                      💙 EVERYONE IS WELCOME!
                    </p>
                    <p className="font-body-sm text-[13px] text-slate-600">
                      Zero gate fees. Zero admission requirements. Simply arrive ready to celebrate!
                    </p>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-label-sm text-[12px] font-bold shadow-sm transition-colors"
                  onClick={handleCopyInvite}
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>{copyText}</span>
                </button>
              </div>

              {/* DATE & LOCATION QUICK SNAPSHOT */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#EFF6FF] border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Event Schedule</p>
                    <p className="font-label-md text-[13px] font-bold text-slate-800">Saturday, April 26 • 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Meeting Spot</p>
                    <p className="font-label-md text-[13px] font-bold text-slate-800">Riverside Park Pavilion • North Gates</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}