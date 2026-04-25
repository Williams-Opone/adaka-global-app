"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0D1821] text-[#F0F4EF]">
      {/* Background Image - Optimized for all screens */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        {/* Adjusted gradient for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1821] via-[#0D1821]/20 to-[#0D1821]/80" />
      </div>

      <div className="container mx-auto px-6 z-10 pt-20 pb-12">
        <div className="max-w-5xl">
          {/* Responsive Heading: Scaled from 4xl (mobile) to 10rem (desktop) */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] sm:leading-[0.85] uppercase"
          >
            Engineering <br />
            <span className="opacity-30 italic">Excellence.</span>
          </motion.h1>

          {/* Subtext: Better line-height and max-width for phone readability */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 md:mt-8 font-sans text-base sm:text-lg md:text-xl max-w-sm sm:max-w-xl opacity-60 leading-relaxed uppercase tracking-widest"
          >
            Providing innovative procurement, maritime support, and professional services to the global energy sector since 2011.
          </motion.p>

          {/* Buttons: Stacked on small mobile, row on larger screens */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Link href="/inventory" className="w-full sm:w-auto">
              <button className="w-full bg-[#F0F4EF] text-[#0D1821] px-8 py-4 md:px-10 md:py-5 font-heading text-xl md:text-2xl uppercase hover:invert transition-all active:scale-95">
                Explore Inventory
              </button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <button className="w-full border border-[#F0F4EF]/20 text-[#F0F4EF] px-8 py-4 md:px-10 md:py-5 font-heading text-xl md:text-2xl uppercase hover:bg-white/5 transition-colors active:scale-95">
                Our Services
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Vertical Established Label: Hidden on small screens, shown from md up */}
      <div className="absolute right-6 bottom-10 hidden md:block">
        <p className="font-heading text-xs uppercase tracking-[0.5em] opacity-20 origin-bottom-right -rotate-90">
          Established 2011 — A.G.E
        </p>
      </div>
    </section>
  );
}