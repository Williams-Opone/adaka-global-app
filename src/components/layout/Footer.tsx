"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("http://127.0.0.1:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error("Already subscribed or error occurred.");
      }
    } catch {
      toast.error("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0D1821] text-[#F0F4EF] pt-20 md:pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          
          {/* Brand Identity */}
          <div className="space-y-6 md:space-y-8">
            <h3 className="font-heading text-5xl sm:text-6xl leading-[0.85] uppercase">
              ADAKA<br />
              <span className="opacity-20">GLOBAL</span>
            </h3>
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-widest leading-loose opacity-40 max-w-sm">
              Industrial Excellence Since 2011. Registered Maritime and Engineering services in Canada and Nigeria.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg sm:text-xl uppercase text-white/30 tracking-[0.2em]">Office</h4>
            <div className="space-y-3">
              <p className="font-heading text-2xl tracking-wide uppercase">Calgary, Alberta</p>
              <p className="font-sans text-xs sm:text-sm opacity-60 leading-relaxed uppercase">
                65 FALBURY CREST NE<br />T3J 1H8 CANADA
              </p>
              <p className="font-heading text-xl mt-4 text-[#F0F4EF]">+1 825-760-4125</p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg sm:text-xl uppercase text-white/30 tracking-[0.2em]">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="group relative border-b border-[#F0F4EF]/20 pb-4">
              <input 
                type="email" 
                required
                placeholder="YOUR EMAIL" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full focus:outline-none font-sans text-xs sm:text-sm uppercase pr-16 placeholder:opacity-30" 
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-0 bottom-4 font-heading text-lg hover:opacity-50 transition-all uppercase tracking-tighter disabled:opacity-30"
              >
                {loading ? "..." : "SEND"}
              </button>
            </form>
            <p className="font-sans text-[9px] uppercase opacity-20 tracking-widest">
              Join our list for fleet updates.
            </p>
          </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="mt-20 md:mt-32 pt-8 border-t border-[#F0F4EF]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.3em] opacity-20">
          <span>© 2026 ADAKA GLOBAL</span>
          <span className="hidden sm:inline">Maritime • Engineering • Procurement</span>
          <span className="sm:hidden">Asset Management</span>
        </div>
      </div>
    </footer>
  );
}