"use client";

import React from "react";
import { motion } from "framer-motion";
import { Ship, HardHat, Cog, Mountain, ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";

const fullServices = [
  {
    id: "marine",
    title: "Marine Support",
    icon: <Ship size={32} />,
    image: "/images/services/ship.jpg",
    content: "We provide a broad range of offshore support services coupled with the highest standards of safety, service and technology available in the industry.",
    specs: [
      { label: "Vessels", value: "Crew Boats, PSV, FSIV, AHTS" },
      { label: "Security", value: "Ballistic Protected Escort Vessels" },
      { label: "Specialty", value: "Diving Support & Emergency Response" }
    ]
  },
  {
    id: "engineering",
    title: "Engineering & Manpower",
    icon: <HardHat size={32} />,
    image: "/images/services/engineering.jpg",
    content: "Our Engineering Services comprises of Conceptual, Front End and Detailed Engineering Designs (FEED), Project Management, and AutoCAD Drafting.",
    specs: [
      { label: "Facilities", value: "Onshore Flowstations, Pipelines" },
      { label: "Offshore", value: "Production Platforms & Topsides" },
      { label: "Manpower", value: "Technical Staffing & Design Reviews" }
    ]
  },
  {
    id: "process",
    title: "Process Control Systems",
    icon: <Cog size={32} />,
    image: "/images/services/process.jpg",
    content: "Full implementation of PLC – SIS – DCS – HMI – SCADA systems in Nigeria, eliminating high cost and delays in mobilizing expatriates.",
    specs: [
      { label: "Fabrication", value: "Gas Treatment & Chemical Injection Skids" },
      { label: "Integration", value: "Local Equipment Rooms & Safe Refuges" },
      { label: "AMS", value: "RFID Tagging & 3D Operational Data" }
    ]
  },
  {
    id: "resources",
    title: "Mineral & Farm Produce",
    icon: <Mountain size={32} />,
    image: "/images/services/farm.jpg",
    content: "Strategic trading in Mineral Resources and large-scale supply of farm produce and maritime/construction equipments since 2011.",
    specs: [
      { label: "Minerals", value: "Lithium Ore, Coal, Iron Ore" },
      { label: "Agriculture", value: "Bulk Farm Produce & Logistics" }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-secondary pt-24 md:pt-32 pb-20 text-primary overflow-x-hidden">
      <div className="container mx-auto px-6">
        
        {/* Page Header: Adjusted scaling for smaller screens */}
        <div className="max-w-4xl mb-20 md:mb-32">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-heading text-5xl sm:text-7xl md:text-9xl uppercase leading-none mb-6 md:mb-8"
          >
            Our <br /> <span className="opacity-30">Expertise.</span>
          </motion.h1>
          <p className="font-sans text-[10px] sm:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-50 border-l-2 border-primary pl-4 md:pl-6 leading-relaxed">
            Innovative solutions for Power, Oil & Gas, and Telecom sectors.
          </p>
        </div>

        {/* Services List: space-y-32 on mobile, space-y-60 on desktop */}
        <div className="space-y-32 md:space-y-60">
          {fullServices.map((service, index) => (
            <motion.section 
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* background decorative number: scaled down for mobile */}
              <span className="absolute -top-10 md:-top-20 -left-4 md:-left-10 font-heading text-[8rem] sm:text-[12rem] md:text-[15rem] opacity-[0.03] pointer-events-none select-none">
                0{index + 1}
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
                
                {/* Left: Branding & Visual */}
                <div className="lg:col-span-5 space-y-6 md:space-y-8">
                  <div className="bg-primary text-secondary w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    {/* scaling icon for mobile */}
                    {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-tight">
                    {service.title}
                  </h2>
                  <div className="aspect-[4/5] w-full overflow-hidden bg-primary/10 relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full"
                    >
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw" // Optimized for your grid
                        quality={90}
                        className="object-cover grayscale contrast-125 brightness-90 sm:brightness-100"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Right: Content & Specs */}
                <div className="lg:col-span-7 lg:pt-32">
                  <p className="font-sans text-xl sm:text-2xl md:text-3xl leading-snug opacity-80 mb-10 md:mb-16 uppercase italic">
                    {service.content}
                  </p>
                  
                  {/* Specs Grid: 1 col on mobile, 2 col on tablet/desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 md:gap-y-12 gap-x-8 border-t border-primary/20 pt-10 md:pt-12">
                    {service.specs.map((spec, i) => (
                      <div key={i} className="group">
                        <h4 className="font-heading text-[10px] sm:text-xs uppercase opacity-40 tracking-widest mb-2 md:mb-3 group-hover:opacity-100 transition-opacity">
                          {spec.label}
                        </h4>
                        <p className="font-heading text-xl md:text-2xl uppercase leading-tight border-l-2 border-transparent lg:group-hover:border-primary lg:pl-0 lg:group-hover:pl-4 transition-all">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom CTA: Full screen width on mobile (-mx-6) */}
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="mt-32 md:mt-60 bg-primary text-secondary p-10 sm:p-16 md:p-24 text-center relative overflow-hidden -mx-6 md:mx-0"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image 
              src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?auto=format&fit=crop&q=80&w=2000" // Place your file in public/services/
              alt="Background"
              fill
              sizes="100vw"
              priority={false}
              className="object-cover grayscale"
            />
          </div>

          <div className="relative z-10">
            <h3 className="font-heading text-4xl sm:text-6xl md:text-8xl uppercase mb-10 md:mb-12 leading-[0.9]">
              Ready to <br /> <span className="opacity-30">Initiate?</span>
            </h3>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-4 md:gap-6 bg-secondary text-primary px-8 py-4 md:px-12 md:py-6 font-heading text-xl sm:text-2xl md:text-3xl uppercase hover:invert transition-all group w-full sm:w-auto justify-center"
            >
              <span>Speak with an Engineer</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}