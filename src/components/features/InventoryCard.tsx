"use client";
import { motion } from "framer-motion";
import { Anchor, Truck, Pickaxe, Leaf, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const getIcon = (category: string) => {
  switch (category) {
    case 'equipment': return <Anchor size={14} className="md:w-4 md:h-4" />;
    case 'cars': return <Truck size={14} className="md:w-4 md:h-4" />;
    case 'minerals': return <Pickaxe size={14} className="md:w-4 md:h-4" />;
    case 'farm': return <Leaf size={14} className="md:w-4 md:h-4" />;
    default: return null;
  }
};

export default function InventoryCard({ item }: { item: any }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-secondary group border border-primary/10 flex flex-col overflow-hidden h-full"
    >
      {/* --- IMAGE SECTION: Responsive Aspect Ratio --- */}
      <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden bg-[#0D1821]">
        <motion.img 
          src={item.image_url || "/placeholder-industrial.jpg"}
          alt={item.name}
          className="w-full h-full object-cover  brightness-90 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
        />
        
        {/* Category Badge: Scaled for mobile */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-secondary/90 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 flex items-center gap-2 border border-primary/10">
          <span className="text-primary">{getIcon(item.category)}</span>
          <span className="font-heading text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-widest">
            {item.category}
          </span>
        </div>

        {/* Status Tag */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4">
           <span className="bg-primary text-secondary px-2 py-1 font-heading text-[8px] md:text-[10px] uppercase tracking-tighter">
             {item.status}
           </span>
        </div>
      </div>

      {/* --- CONTENT SECTION: Optimized Padding for Mobile --- */}
      <div className="p-5 md:p-8 flex flex-col flex-grow justify-between gap-6">
        <div>
          {/* Heading: Scaled from 2xl to 3xl */}
          <h3 className="font-heading text-2xl md:text-3xl uppercase leading-[0.9] mb-3 md:mb-4 tracking-tight md:tracking-normal">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-40">
            <MapPin size={10} className="md:w-3 md:h-3" />
            <span className="truncate">{item.location}</span>
          </div>
        </div>

        <Link 
          href={`/inventory/${item.id}`}
          className="w-full py-3.5 md:py-4 border border-primary text-primary flex items-center justify-center gap-3 md:gap-4 font-heading text-lg md:text-xl uppercase hover:bg-primary hover:text-secondary transition-all active:scale-[0.98]"
        >
          <span>View Specs</span>
          <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}