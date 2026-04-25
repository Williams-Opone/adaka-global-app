"use client";
import { motion } from "framer-motion";
import Image from 'next/image';
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    title: "Offshore Logistics",
    label: "Maritime Support",
    description: "Expert coordination of ballistic security vessels, PSVs, and crew boats across the Gulf of Guinea.",
    image: "/images/container.jpg" // Use a local, high-res image!
  },
  {
    title: "Heavy Infrastructure",
    label: "Earthmoving & Marine",
    description: "End-to-end management of large-scale excavation and dredging projects for industrial sites.",
    image: "/images/excavator.jpg"
  }
];

export default function OperationalPreview() {
  return (
    <section className="py-20 md:py-32 bg-[#0D1821] text-[#F0F4EF]">
      <div className="container mx-auto px-6">
        {/* Header: Responsive text and alignment */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-12 md:mb-20 gap-6 md:gap-8">
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase leading-none">
            Field <br /> <span className="opacity-20 italic">Operations.</span>
          </h2>
          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-40 max-w-xs sm:max-w-sm">
            Bridging the gap between global manufacturers and local industrial capacity since 2011.
          </p>
        </div>

        {/* Cards Grid: Adaptive spacing and heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {capabilities.map((item, index) => (
              <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-[#162633] p-8 md:p-10 flex flex-col justify-between h-[400px] sm:h-[450px] md:h-[500px]"
            >
              {/* Background Image: Higher base opacity on mobile since 'hover' is less frequent */}
              <div className="absolute inset-0 z-0 opacity-30 lg:opacity-20 lg:group-hover:opacity-40 transition-opacity duration-700">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2} // Preload the first two images to prevent initial blur
                    quality={100}        // Set to 100 to force max sharpness
                    className="object-cover grayscale"
                  />
                  {/* Mobile-specific overlay to ensure text pops */}
                  <div className="absolute inset-0 bg-[#0D1821]/40 lg:hidden" />
              </div>

              <div className="z-10 flex justify-between items-start">
                <span className="font-heading text-[10px] uppercase tracking-[0.3em] border border-white/20 px-3 py-1 bg-[#0D1821]/50 backdrop-blur-sm lg:bg-transparent">
                  {item.label}
                </span>
                <Link href="/inventory" className="lg:hover:rotate-45 transition-transform p-2 bg-white/10 rounded-full lg:bg-transparent lg:p-0">
                  <ArrowUpRight size={28} className="md:w-8 md:h-8" />
                </Link>
              </div>

              <div className="z-10">
                {/* Heading: Scaled for smaller screens */}
                <h3 className="font-heading text-4xl sm:text-5xl uppercase mb-3 md:mb-4 tracking-tighter sm:tracking-normal">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm opacity-70 lg:opacity-60 uppercase tracking-widest leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}