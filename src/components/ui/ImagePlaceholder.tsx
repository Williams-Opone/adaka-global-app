"use client";
import { motion } from "framer-motion";

interface PlaceholderProps {
  aspectRatio?: string; // e.g., "aspect-video" or "aspect-square"
}

export default function ImagePlaceholder({ aspectRatio = "aspect-video" }: PlaceholderProps) {
  return (
    <div className={`relative w-full ${aspectRatio} bg-[#0D1821]/5 overflow-hidden border border-[#0D1821]/5`}>
      {/* Moving Shimmer Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0D1821]/5 to-transparent"
      />
      
      {/* Industrial Grid Overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#0D1821 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-xs uppercase tracking-[0.3em] opacity-20">
          Media Pending
        </span>
      </div>
    </div>
  );
}