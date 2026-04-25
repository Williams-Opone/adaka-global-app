"use client";
import { motion } from "framer-motion";
import { ChevronDown, HardHat, Ship, Zap, Drill, Pickaxe } from "lucide-react";
import { useState } from "react";
import Image from 'next/image';

const serviceData = [
  {
    id: "01",
    title: "Engineering & Manpower",
    icon: <HardHat size={32} />,
    image: "/images/engineering.jpg",
    description: "Our Engineering Services comprise of Conceptual, Front End and Detailed Engineering Designs, Project and Construction Management, and AutoCAD Drafting.",
    subItems: ["Onshore Flowstations", "Offshore Production Platforms", "Subsea Umbilicals", "Technical Manpower Supply"]
  },
  {
    id: "02",
    title: "Marine Support",
    icon: <Ship size={32} />,
    image: "/images/marinesupport.jpg",
    description: "Providing a broad range of offshore support services coupled with the highest standards of safety and industry-leading technology.",
    subItems: ["Crew Boats / FSIV", "Platform Supply Vessels (PSV)", "Diving Support Vessels", "Security (Ballistic) Vessels"]
  },
  {
    id: "03",
    title: "Process Control Systems",
    icon: <Zap size={32} />,
    image: "/images/process.jpg",
    description: "Full implementation of PLC – SIS – DCS – HMI – SCADA systems. Fabrication and Integration of Process Skids and Utility Enclosures.",
    subItems: ["Gas Treatment Skids", "Chemical Injection", "AMS Knowledge Base", "Real-time Data Tagging"]
  },
  {
    id: "04",
    title: "Procurement & Supply",
    icon: <Drill size={32} />,
    image: "/images/procurement.jpg",
    description: "Strategic partnerships with global OEMs to provide Oil & Gas tools, OCTGs, Line pipes, and hazardous waste incinerators.",
    subItems: ["Wellheads & Xmas Trees", "Industrial Fire Equipment", "Chemicals & Valves", "Pipe Fittings"]
  },
  {
    id: "05",
    title: "Import & Export Logistics",
    icon: <Ship size={32} />, // Or use 'Globe' from lucide-react
    image: "/images/warehousing.jpg",
    description: "End-to-end clearing, forwarding, and global freight management. We navigate complex customs frameworks to ensure your industrial assets move across borders without delay.",
    subItems: ["Customs Brokerage", "Freight Forwarding", "Warehousing & Storage", "Global Supply Chain Management"]
  },
  {
    id: "06",
    title: "Minerals & Farm Produce",
    icon: <Pickaxe size={32} />, 
    image: "/images/farmproduce.jpg",
    description: "Sourcing and distribution of high-grade solid minerals and premium agricultural products for the global market, ensuring strict adherence to international quality standards.",
    subItems: ["Lithium Ore & Solid Minerals", "Crude Palm Oil (CPO)", "Export Grade Raw Materials", "Quality Assay Verification"]
  }
];

export default function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-32 bg-[#F0F4EF] text-[#0D1821]">
      <div className="container mx-auto px-6">
        {/* Header: Adjusted for mobile stacking and scaling */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-5xl sm:text-6xl md:text-8xl leading-none uppercase">
              Core <br /> <span className="opacity-30">Capabilities.</span>
            </h2>
          </div>
          <p className="font-sans text-[10px] sm:text-sm uppercase tracking-widest opacity-60 max-w-xs border-l border-[#0D1821] pl-4 md:pl-6 leading-relaxed">
            Providing integrated solutions across the entire energy value chain.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 md:gap-4">
          {serviceData.map((service) => (
            <motion.div 
              key={service.id}
              className="border-b border-[#0D1821]/10 overflow-hidden"
            >
              <button 
                onClick={() => setActive(active === service.id ? null : service.id)}
                className="w-full py-6 md:py-10 flex items-center justify-between group text-left"
              >
                <div className="flex items-center space-x-4 md:space-x-12">
                  <span className="font-heading text-lg md:text-2xl opacity-20 hidden sm:block">{service.id}</span>
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <span className="opacity-40 group-hover:opacity-100 transition-opacity scale-75 md:scale-100">{service.icon}</span>
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-5xl uppercase group-hover:pl-2 md:group-hover:pl-4 transition-all leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <ChevronDown className={`shrink-0 transition-transform duration-500 ${active === service.id ? 'rotate-180' : ''}`} size={20} />
              </button>

              <motion.div 
                initial={false}
                animate={{ height: active === service.id ? "auto" : 0 }}
                className="overflow-hidden"
              >
                {/* Responsive Padding: pl-4 on mobile, pl-24 on desktop */}
                <div className="pb-10 pt-2 pl-4 md:pl-24 pr-4 md:pr-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6 md:space-y-8">
                    <p className="font-sans text-base md:text-lg opacity-70 leading-relaxed uppercase">
                      {service.description}
                    </p>
                    
                    <div className="relative aspect-video w-full bg-[#0D1821] overflow-hidden rounded-sm">
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                      />
                    </div>
                  </div>
                  
                  <ul className="grid grid-cols-1 gap-3 md:gap-4 self-start">
                    {service.subItems.map((item, i) => (
                      <li key={i} className="font-heading text-lg md:text-xl uppercase flex items-center space-x-3">
                        <div className="shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0D1821]" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}