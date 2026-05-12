"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InventoryItem } from "@/types/inventory";

interface AssetDetailsProps {
  asset: InventoryItem;
}

export default function AssetDetails({ asset }: AssetDetailsProps) {
  // We only need state for the image gallery toggle
  const [activeImage, setActiveImage] = useState<string>(asset.images?.[0] || asset.image_url);

  return (
    <div className="min-h-screen bg-secondary text-primary overflow-x-hidden pt-20">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        
        {/* LEFT SIDE: The Hero Image */}
        <div className="w-full lg:w-7/12 h-[50vh] sm:h-[60vh] lg:h-screen lg:sticky lg:top-0 bg-[#0D1821] overflow-hidden relative">
          <Link 
            href="/inventory" 
            className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-[#0D1821]/80 backdrop-blur-md text-[#F0F4EF] px-5 py-3 font-heading text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-secondary transition-all duration-300 border border-white/10"
          >
            <ArrowLeft size={16} /> <span>Return to Fleet</span>
          </Link>

          <div className="flex-grow relative h-full">
            {activeImage && (
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={activeImage} 
                className="w-full h-full object-cover brightness-75 lg:brightness-100"
                alt={asset.name}
              />
            )}
          </div>

          {/* Thumbnails */}
          {Array.isArray(asset.images) && asset.images.length > 1 && (
            <div className="absolute bottom-24 left-6 md:bottom-28 md:left-10 flex gap-3 overflow-x-auto max-w-[80%] pb-2 z-20">
              {asset.images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 border-2 transition-all flex-shrink-0 ${activeImage === img ? 'border-primary' : 'border-white/20'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                </button>
              ))}
            </div>
          )}
          
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 border-l-4 border-primary bg-secondary px-4 py-3 md:px-6 md:py-4 shadow-2xl z-10">
            <span className="font-heading text-[8px] md:text-xs uppercase tracking-[0.3em] block opacity-40 mb-1">Asset ID</span>
            <span className="font-heading text-xl md:text-2xl uppercase">AGE-00{asset.id}</span>
          </div>
        </div>

        {/* RIGHT SIDE: Technical Data */}
        <div className="w-full lg:w-5/12 p-6 sm:p-10 md:p-16 lg:p-24 bg-secondary flex flex-col justify-center border-l border-primary/5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="opacity-40 uppercase text-[8px] md:text-[10px] tracking-[0.4em] block mb-4">
              Inventory / {asset.category}
            </span>
            
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl uppercase leading-[0.9] mb-6 tracking-tighter">
              {asset.name}
            </h1>

            <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-widest opacity-60 mb-8">
              <MapPin size={14} className="text-primary" /> 
              <span>Deployed at {asset.location}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 bg-primary/10 border-y border-primary/10 py-8 mb-8">
              <div className="sm:pr-4 sm:border-r border-primary/10">
                <p className="text-[8px] uppercase opacity-40 mb-2 font-heading tracking-widest">Operational Status</p>
                <div className="flex items-center gap-3 font-heading text-xl uppercase">
                  <ShieldCheck size={18} /> {asset.status || "Verified"}
                </div>
              </div>
              <div className="sm:pl-8">
                <p className="text-[8px] uppercase opacity-40 mb-2 font-heading tracking-widest">Classification</p>
                <div className="flex items-center gap-3 font-heading text-xl uppercase">
                  <Clock size={18} /> {asset.category === 'cars' ? asset.year : (asset.equipment_class || 'Industrial')}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <h4 className="font-heading text-lg uppercase tracking-widest opacity-30 underline decoration-1 underline-offset-8">Technical Overview</h4>
              <p className="font-sans text-xs md:text-sm leading-relaxed uppercase opacity-70">
                {asset.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link 
                href={`/contact?interest=${asset.name}`} 
                className="w-full bg-primary text-secondary py-5 font-heading text-xl uppercase text-center hover:invert transition-all"
              >
                Inquire for Pricing
              </Link>
              <a 
                href="tel:+18257604125"
                className="w-full border border-primary/20 text-primary py-5 font-heading text-xl uppercase text-center hover:bg-primary hover:text-secondary transition-all flex flex-col items-center"
              >
                <span className="opacity-40 text-[10px] tracking-widest mb-1">Immediate Response</span>
                <span>Call +1 (825) 760-4125</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}