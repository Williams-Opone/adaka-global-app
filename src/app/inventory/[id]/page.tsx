"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Clock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { InventoryItem } from "@/types/inventory";

export default function InventoryDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/inventory/${id}`);
        if (!res.ok) throw new Error("Item not found");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error(err);
        router.push("/inventory");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, router]);

  useEffect(() => {
    if (item) {
      // If item.images exists and has items, use the first one, else fallback
      setActiveImage(item.images?.[0] || item.image_url);
    }
  }, [item]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-secondary text-primary overflow-x-hidden">
      {/* Responsive Navigation: Position relative on mobile to save vertical space */}
      

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        
        {/* LEFT SIDE: The Hero Image - Fixed on Desktop, Scrollable on Mobile */}
        <div className="w-full lg:w-7/12 h-[50vh] sm:h-[60vh] lg:h-screen lg:sticky lg:top-0 bg-[#0D1821] overflow-hidden relative">
  
          {/* --- RETURN TO FLEET (Absolute positioned on the image) --- */}
          <Link 
            href="/inventory" 
            className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-[#0D1821]/80 backdrop-blur-md text-[#F0F4EF] px-5 py-3 font-heading text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-secondary transition-all duration-300 border border-white/10"
          >
            <ArrowLeft size={16} /> <span>Return to Fleet</span>
          </Link>

          <div className="flex-grow relative">
            {/* ONLY render the img if activeImage is not an empty string */}
            {activeImage && (
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={activeImage} 
                className="w-full h-full object-cover brightness-75 lg:brightness-100"
                alt={item.name}
              />
            )}
          </div>

          {/* --- PASTE THE THUMBNAILS RIGHT HERE --- */}
          {Array.isArray((item as any).images) && (item as any).images.length > 1 ? (
            <div className="absolute bottom-24 left-6 md:bottom-28 md:left-10 flex gap-3 overflow-x-auto max-w-[80%] pb-2 z-20">
              {(item as any).images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-white/20'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
          
          {/* Industrial Badge */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 border-l-4 border-primary bg-secondary px-4 py-3 md:px-6 md:py-4 shadow-2xl z-10">
            <span className="font-heading text-[8px] md:text-xs uppercase tracking-[0.3em] block opacity-40 mb-1">Asset ID</span>
            <span className="font-heading text-xl md:text-2xl uppercase">AGE-00{item.id}</span>
          </div>
        </div>

        {/* RIGHT SIDE: Technical Data */}
        <div className="w-full lg:w-5/12 p-6 sm:p-10 md:p-16 lg:p-24 bg-secondary flex flex-col justify-center border-l border-primary/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="opacity-40 uppercase text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] block mb-4 md:mb-6">
              Inventory / {item.category}
            </span>
            
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl uppercase leading-[0.9] mb-6 md:mb-8 tracking-tighter sm:tracking-normal">
              {item.name}
            </h1>

            <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-widest opacity-60 mb-8 md:mb-12">
              <MapPin size={14} className="text-primary" /> 
              <span>Deployed at {item.location}</span>
            </div>

            {/* Quick Specs Grid: 1 col on very small, 2 col on sm up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-px bg-primary/10 border-y border-primary/10 py-8 md:py-10 mb-8 md:mb-12">
              <div className="sm:pr-4 sm:border-r border-primary/10">
                <p className="text-[8px] md:text-[10px] uppercase opacity-40 mb-2 md:mb-3 font-heading tracking-widest">Operational Status</p>
                <div className="flex items-center gap-3 font-heading text-xl md:text-2xl uppercase">
                  <ShieldCheck size={18} /> {item.status}
                </div>
              </div>
              <div className="sm:pl-8">
                <p className="text-[8px] md:text-[10px] uppercase opacity-40 mb-2 md:mb-3 font-heading tracking-widest">Classification</p>
                <div className="flex items-center gap-3 font-heading text-xl md:text-2xl uppercase">
                  <Clock size={18} /> {item.category === 'cars' ? item.year : (item.equipment_class || 'Standard')}
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
              <h4 className="font-heading text-lg md:text-xl uppercase tracking-widest opacity-30 underline decoration-1 underline-offset-8">Technical Overview</h4>
              <p className="font-sans text-xs md:text-sm leading-relaxed uppercase opacity-70">
                {item.description || `Industrial assets managed by ADAKA GLOBAL undergo rigorous integrity management inspections. This ${item.name} is verified for professional use in the ${item.category} sector.`}
              </p>
            </div>

            {/* Call to Action: Direct Response Section */}
          <div className="flex flex-col gap-4 mt-8">
            {/* PRIMARY: Email/Inquiry */}
            <Link 
              href={`/contact?interest=${item.name}`} 
              className="w-full bg-primary text-secondary py-5 md:py-6 font-heading text-xl md:text-2xl uppercase text-center hover:invert transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              Inquire for Pricing
            </Link>

            {/* SECONDARY: Direct Call - Using 'tel:' so it works on mobile */}
            <a 
              href="tel:+18257604125"
              className="w-full border border-primary/20 text-primary py-5 md:py-6 font-heading text-xl md:text-2xl uppercase text-center hover:bg-primary hover:text-secondary transition-all flex flex-col items-center justify-center leading-tight"
            >
              <span className="opacity-40 text-[10px] tracking-widest mb-1">Immediate Response</span>
              <span>Call +1 (825) 760-4125</span>
            </a>

            <p className="text-[8px] md:text-[9px] text-center uppercase opacity-30 tracking-[0.3em] italic leading-loose mt-2">
              Ref: AGE-LOGISTICS-GLOBAL-2026
            </p>
          </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}