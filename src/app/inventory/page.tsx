"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InventoryItem } from "@/types/inventory";
import InventoryCard from "../../components/features/InventoryCard";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/inventory/all') 
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend connection failed:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["all", "equipment", "cars", "minerals", "farm"];
  const filteredItems = (Array.isArray(items) ? items : []).filter(
    (item) => filter === "all" || item.category.toLowerCase() === filter.toLowerCase()
  );

  if (loading) return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
       <h2 className="font-heading text-2xl md:text-4xl animate-pulse text-primary uppercase tracking-widest">
         Loading Fleet...
       </h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary pt-24 md:pt-32 pb-20 overflow-x-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header: Responsive scale and bottom margin */}
        <header className="mb-10 md:mb-16">
          <h1 className="font-heading text-5xl sm:text-7xl md:text-9xl uppercase leading-none text-primary">
            Live <br /> <span className="opacity-30 italic">Listings.</span>
          </h1>
        </header>

        {/* Filters: Horizontal scroll on mobile, wrap on desktop */}
        <div className="relative mb-12">
          <div className="flex flex-nowrap md:flex-wrap gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible pb-6 md:pb-8 border-b border-primary/10 no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`font-heading text-lg md:text-2xl uppercase px-5 py-2 md:px-8 md:py-3 transition-all whitespace-nowrap flex-shrink-0 ${
                  filter === cat 
                  ? "bg-primary text-secondary" 
                  : "text-primary opacity-30 hover:opacity-100 border border-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Subtle indicator for mobile that more categories exist */}
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-secondary to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <InventoryCard key={item.id || index} item={item} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center opacity-20 font-heading text-2xl md:text-4xl uppercase"
              >
                No assets found in this category
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}