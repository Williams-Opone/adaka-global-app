"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Users, PlusSquare, LogOut, Menu, X } from "lucide-react";

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Leads", href: "/admin/leads", icon: <Users size={20} /> },
    { name: "Add Asset", href: "/admin/add-inventory", icon: <PlusSquare size={20} /> },
    { name: "Logout", href: "/", icon: <LogOut size={20} /> }
  ];

  return (
    <>
      {/* 1. THE TRIGGER BUTTON (Logo / Menu Icon) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 left-8 z-[110] bg-[#0D1821] text-[#F0F4EF] p-4 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3 group"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
        <span className="font-heading text-sm uppercase tracking-widest group-hover:pl-2 transition-all">
          ADAKA <span className="opacity-40">HQ</span>
        </span>
      </button>

      {/* 2. THE OVERLAY (Blurs the background when menu is open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#0D1821]/60 backdrop-blur-sm z-[90]"
          />
        )}
      </AnimatePresence>

      {/* 3. THE SIDEBAR */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-screen w-80 bg-[#0D1821] border-r border-white/10 z-[100] p-12 flex flex-col"
      >
        <div className="mb-16 mt-20">
          <h2 className="font-heading text-4xl text-[#F0F4EF] leading-none">COMMAND<br/>CENTER</h2>
          <div className="h-1 w-12 bg-[#F0F4EF] mt-4 opacity-20" />
        </div>

        <nav className="flex-grow space-y-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-6 py-2 font-heading text-2xl uppercase tracking-tighter transition-all ${
                pathname === link.href 
                  ? "text-[#F0F4EF] opacity-100 pl-4 border-l-2 border-[#F0F4EF]" 
                  : "text-[#F0F4EF] opacity-30 hover:opacity-100 hover:pl-2"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 opacity-20 text-[10px] uppercase tracking-[0.4em] text-[#F0F4EF]">
          © ADAKA GLOBAL 2026
        </div>
      </motion.div>
    </>
  );
}